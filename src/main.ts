import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import Environment from './shared/utils/environment.util';
import { SwaggerUtils } from './shared/utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  app.use(helmet());

  if (!Environment.is_production) {
    app.use(morgan('tiny'));
  }

  new SwaggerUtils(app);

  await app.listen(3333);
}
bootstrap();
