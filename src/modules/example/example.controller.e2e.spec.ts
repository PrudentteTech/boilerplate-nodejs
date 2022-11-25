import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { getApp } from '../../../test/testing-module';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  it('(POST) /example/teste', () => {
    const data = { info: 'A' };

    return request(app.getHttpServer()).post('/example/teste').send(data).expect(201).expect(data);
  });
});
