import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT ? parseInt(process.env.PORT) : 1111;
  await app.listen(port);
  console.log(`App runs on port ${port}`);
}
bootstrap();
