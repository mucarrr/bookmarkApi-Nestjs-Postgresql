import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove extra properties from the request body
    forbidNonWhitelisted: true, // throw an error if extra properties are found
    transform: true, // transform the request body to the DTO class
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
