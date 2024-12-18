import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

import { AppModule } from "@src/app.module";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*", allowedHeaders: "*" });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
