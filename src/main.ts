import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this will allow us to use validations, for example from the 'class-validator' package validations for our dto's
  // whitelist will remove additional unknown keys, for example { email: 'mail@mail.com', password: '123', unknowKey: 'some random key value' }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3001);
}
bootstrap();
