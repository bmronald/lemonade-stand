import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Set a global prefix for all routes
  app.setGlobalPrefix('api');

  // Apply global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger/OpenAPI setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lemonade-Stand API')
    .setDescription('API documentation for the Lemonade-Stand backend')
    .setVersion('1.0')
    .addBearerAuth() // if you plan to secure endpoints later
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🍋 Lemonade backend listening on http://localhost:${port}`, 'Bootstrap');
  Logger.log(`📖 Swagger docs available at http://localhost:${port}/api-docs`, 'Bootstrap');
}

bootstrap();
