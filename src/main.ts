// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule }  from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,       // auto-transform payloads to DTO classes
    }),
  );

  await app.listen(3000);
  console.log('🍋 Leomonade backend listening on http://localhost:3000');
}
bootstrap();
