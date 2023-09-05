import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger();

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () =>
    logger.log(`Application started on PORT=${port}`)
  );
}
bootstrap();
