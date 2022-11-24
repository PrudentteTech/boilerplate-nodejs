import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../app.module';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module_fixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module_fixture.createNestApplication();
    await app.init();
  });

  it('(POST) /example/teste', () => {
    const data = { info: 'A' };

    return request(app.getHttpServer()).post('/example/teste').send(data).expect(201).expect(data);
  });
});
