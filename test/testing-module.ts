import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';

export async function getApp(): Promise<INestApplication> {
  const module_fixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module_fixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  return app.init();
}
