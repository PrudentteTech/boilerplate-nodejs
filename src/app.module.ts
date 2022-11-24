import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { ExampleModule } from '@modules/example/example.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), TerminusModule, ExampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
