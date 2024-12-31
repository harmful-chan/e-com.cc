import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  app.use(express.static(path.join(__dirname, '..', 'public')));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
