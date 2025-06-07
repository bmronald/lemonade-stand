
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
   * The API will be available at `http://localhost:3000`
   * Postgres listens on `localhost:5432` with credentials from `docker-compose.yml`

3. **Stop and remove containers**

   ```bash
   docker-compose down
   ```

---

## API Reference

### Beverage Management

| Method | Endpoint               | Description                              | Body Example                                                                      |
| ------ | ---------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| POST   | `/beverage/types`      | Create a new beverage type               | `{ "name": "Classic Lemonade" }`                                                  |
| GET    | `/beverage/types`      | List all beverage types (with prices)    | —                                                                                 |
| GET    | `/beverage/types/:id`  | Get one beverage type by ID              | —                                                                                 |
| PATCH  | `/beverage/types/:id`  | Update beverage type name                | `{ "name": "New Lemonade" }`                                                      |
| DELETE | `/beverage/types/:id`  | Delete a beverage type (cascades prices) | —                                                                                 |
| POST   | `/beverage/sizes`      | Create a new beverage size               | `{ "name": "Small" }`                                                             |
| GET    | `/beverage/sizes`      | List all beverage sizes (with prices)    | —                                                                                 |
| GET    | `/beverage/sizes/:id`  | Get one beverage size by ID              | —                                                                                 |
| PATCH  | `/beverage/sizes/:id`  | Update beverage size name                | `{ "name": "Medium" }`                                                            |
| DELETE | `/beverage/sizes/:id`  | Delete a beverage size (cascades prices) | —                                                                                 |
| POST   | `/beverage/prices`     | Link type + size to a price              | `{ "beverageTypeId": "<type-id>", "beverageSizeId": "<size-id>", "price": 2.50 }` |
| GET    | `/beverage/prices`     | List all price links                     | —                                                                                 |
| GET    | `/beverage/prices/:id` | Get one price link by ID                 | —                                                                                 |
| PATCH  | `/beverage/prices/:id` | Update price or reassign type/size       | `{ "price": 3.00 }`                                                               |
| DELETE | `/beverage/prices/:id` | Remove a price link                      | —                                                                                 |

### Order Processing

| Method | Endpoint      | Description                | Body Example                                                                                                                                                        |
| ------ | ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/orders`     | Place a new customer order | `{ "customerName": "Alice", "customerContact": "alice@example.com", "items": [ { "beverageTypeId": "<type-id>", "beverageSizeId": "<size-id>", "quantity": 2 } ] }` |
| GET    | `/orders`     | List all customer orders   | —                                                                                                                                                                   |
| GET    | `/orders/:id` | Retrieve one order by ID   | —                                                                                                                                                                   |

---

## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── dist/
├── node_modules/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── beverage/
│   │   ├── beverage.module.ts
│   │   ├── beverage.service.ts
│   │   ├── beverage.controller.ts
│   │   ├── dto/
│   │   └── entities/
│   └── order/
│       ├── order.module.ts
│       ├── order.service.ts
│       ├── order.controller.ts
│       ├── dto/
│       └── entities/
```

---

## Design Choices & Assumptions

* **UUIDs** for all primary keys, ensuring global uniqueness.
* **PriceLink** join table to flexibly map any beverage type × size combination.
* **Global ValidationPipe** enforcing DTO schemas and stripping unknown properties.
* **TypeORM transactions** for atomic, reliable order creation.
* **Eager relations** on PriceLink and OrderItem for simplified data retrieval.
* **Input Validation** (bonus): robust server-side validation via `class-validator` and a global `ValidationPipe`.
* **Containerization** (bonus): Dockerfile and `docker-compose.yml` provided to run the backend and database in containers.

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a branch `feature/your-feature`
3. Commit your changes
4. Open a pull request against `main`

---

## License

This project is licensed under the [MIT License](LICENSE).

```
```
