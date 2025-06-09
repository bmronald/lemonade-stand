
# Lemonade-Backend (NestJS)

[![NestJS](https://img.shields.io/badge/NestJS-v9+-E0234E)](https://nestjs.com)   [![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-3178C6)](https://typescriptlang.org)  [![Node.js](https://img.shields.io/badge/Node.js-16+-339933)](https://nodejs.org) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

A digital lemonade-stand backend to manage beverage offerings and streamline order processing for administrators and customers.

Key features:

- CRUD operations for beverage types, sizes, and price links  
- Customer-facing order placement with automatic total calculation and confirmation IDs  
- Input validation and transactional order processing  

---

## Table of Contents

- [Overview](#overview)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Setup](#setup)  
  - [Local Development](#local-development)  
  - [Docker Setup](#docker-setup)  
- [API Reference](#api-reference)  
  - [Beverage Management](#beverage-management)  
  - [Order Processing](#order-processing)  
- [Swagger-UI](#swagger-ui)
- [Project Structure](#project-structure)  
- [Design Choices & Assumptions](#design-choices--assumptions)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Tech Stack

- **NestJS** (v9+) + **TypeScript** (4.5+)  
- **Node.js** (16+)  
- **TypeORM** (0.3.x) + **PostgreSQL** (13+)  
- **class-validator** (0.13+) / **class-transformer** (0.5+)  
- **Jest** for testing  
- **Docker** & **Docker Compose** (optional)  
- **Swagger** (`@nestjs/swagger`, `swagger-ui-express`)

---

## Prerequisites

- **Node.js** 16 or above  
- **npm** ≥ 6 or **Yarn** ≥ 1.22  
- A running **PostgreSQL** instance (local or via Docker)  
- **Docker** & **Docker Compose** (for containerized setup)  

---

## Setup

### Local Development

1. **Clone the repository**  
   ```bash
   git clone https://github.com/bmronald/lemonade-backend.git
   cd lemonade-backend
2. **Configure environment variables**
   Create a `.env` file in the project root:

   ```ini
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lemonade
   DB_USER=postgres
   DB_PASS=postgres
   ```

3. **Create the database**

   ```sql
   CREATE DATABASE lemonade;
   ```

4. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

5. **Run in development mode**

   ```bash
   npm run start:dev
   ```

   The server will reload on file changes and listen at `http://localhost:3000`.

---

### Docker Setup

1. **Ensure Docker & Docker Compose are installed**

   * [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Build and start containers**

   ```bash
   docker-compose up --build
   ```

   * This will spin up a PostgreSQL container and the NestJS app
   * Swagger UI will be available at `http://localhost:3000/api-docs`
   * Postgres listens on `localhost:5432` with credentials from `docker-compose.yml`
   * All API routes are prefixed with `/api`, e.g. GET `/api/beverage/types`

3. **Stop and remove containers**

   ```bash
   docker-compose down
   ```

---

## API Reference

### Beverage Management

| Method | Endpoint               | Description                              | Body Example                                                                      |
| ------ | ---------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| POST   | `/api/beverage/types`      | Create a new beverage type               | `{ "name": "Classic Lemonade" }`                                                  |
| GET    | `/api/beverage/types`      | List all beverage types (with prices)    | —                                                                                 |
| GET    | `/api/beverage/types/:id`  | Get one beverage type by ID              | —                                                                                 |
| PATCH  | `/api/beverage/types/:id`  | Update beverage type name                | `{ "name": "New Lemonade" }`                                                      |
| DELETE | `/api/beverage/types/:id`  | Delete a beverage type (cascades prices) | —                                                                                 |
| POST   | `/api/beverage/sizes`      | Create a new beverage size               | `{ "name": "Small" }`                                                             |
| GET    | `/api/beverage/sizes`      | List all beverage sizes (with prices)    | —                                                                                 |
| GET    | `/api/beverage/sizes/:id`  | Get one beverage size by ID              | —                                                                                 |
| PATCH  | `/api/beverage/sizes/:id`  | Update beverage size name                | `{ "name": "Medium" }`                                                            |
| DELETE | `/api/beverage/sizes/:id`  | Delete a beverage size (cascades prices) | —                                                                                 |
| POST   | `/api/beverage/prices`     | Link type + size to a price              | `{ "beverageTypeId": "<type-id>", "beverageSizeId": "<size-id>", "price": 2.50 }` |
| GET    | `/api/beverage/prices`     | List all price links                     | —                                                                                 |
| GET    | `/api/beverage/prices/:id` | Get one price link by ID                 | —                                                                                 |
| PATCH  | `/api/beverage/prices/:id` | Update price or reassign type/size       | `{ "price": 3.00 }`                                                               |
| DELETE | `/api/beverage/prices/:id` | Remove a price link                      | —                                                                                 |

### Order Processing

| Method | Endpoint      | Description                | Body Example                                                                                                                                                        |
| ------ | ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/orders`     | Place a new customer order | `{ "customerName": "Alice", "customerContact": "alice@example.com", "items": [ { "beverageTypeId": "<type-id>", "beverageSizeId": "<size-id>", "quantity": 2 } ] }` |
| GET    | `/api/orders`     | List all customer orders   | —                                                                                                                                                                   |
| GET    | `/api/orders/:id` | Retrieve one order by ID   | —                                                                                                                                                                   |

---
## Swagger UI
The application exposes interactive API documentation compliant with the OpenAPI spec. Visit: `http://localhost:3000/api-docs`
You can view available routes, schemas, try out requests, and see response examples directly in the browser.

---
## Project Structure

```
├── Dockerfile
├── docker-compose.yml
├── docker-compose.override.yml
├── dist/
├── node_modules/
├── sql/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── beverage/
│   │   ├── beverage.module.ts
│   │   ├── beverage.service.ts
│   │   ├── beverage.controller.ts
│   │   ├── dto/
│   │   │   ├── create-beverage-type.dto.ts
│   │   │   ├── update-beverage-type.dto.ts
│   │   │   ├── create-beverage-size.dto.ts
│   │   │   ├── update-beverage-size.dto.ts
│   │   │   ├── create-price-link.dto.ts
│   │   │   └── update-price-link.dto.ts
│   │   └── entities/
│   │       ├── beverage-type.entity.ts
│   │       ├── beverage-size.entity.ts
│   │       └── price-link.entity.ts
│   └── order/
│       ├── order.module.ts
│       ├── order.service.ts
│       ├── order.controller.ts
│       ├── dto/
│       │   ├── create-order-item.dto.ts
│       │   └── create-order.dto.ts
│       └── entities/
│           ├── order.entity.ts
│           └── order-item.entity.ts
```

---

## Design Choices & Assumptions

* **UUIDs** for all primary keys, ensuring global uniqueness.
* **PriceLink** join table to flexibly map any beverage type × size combination.
* **Global ValidationPipe** enforcing DTO schemas and stripping unknown properties.
* **TypeORM transactions** for atomic, reliable order creation.
* **Eager relations** on PriceLink and OrderItem for simplified data retrieval.
* **ParseUUIDPipe** on all :id params for 400 on invalid format.
* **Swagger Integration** using @nestjs/swagger and swagger-ui-express.
* **Input Validation** (bonus): robust server-side validation via `class-validator` and a global `ValidationPipe`.
* **Containerization** (bonus): Dockerfile and `docker-compose.yml` provided to run the backend and database in containers.

---

## License

This project is licensed under the [MIT License](LICENSE).
