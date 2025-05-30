import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // This tells Nest:"Any time I use a DTO, validate it before running the controller method."
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
