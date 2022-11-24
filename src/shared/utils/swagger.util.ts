import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class SwaggerUtils {
  private title = '{{serviço}} Service';
  private version = '1';
  private description = ``;

  constructor(app: INestApplication) {
    const config = new DocumentBuilder().setTitle(this.title).setDescription(this.description).setVersion(this.version).build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }
}
