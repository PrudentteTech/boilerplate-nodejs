import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { getApp } from '../test/testing-module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getApp();
  });

  it('(GET) /', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello from SERVICE_NAME service');
  });

  it('(GET) /readyz', () => {
    return request(app.getHttpServer()).get('/readyz').expect(200);
  });
});
