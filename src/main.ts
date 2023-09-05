import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new Logger();

  app.enableCors();

  await app.listen(port, () =>
    logger.log(`Application started on PORT=${port}`)
  );
}
bootstrap();
