import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import * as winston from 'winston';

import Environment from '@shared/utils/environment.util';

import * as ElasticsearchProvider from '../elasticsearch/elasticsearch.provider';

type ConsoleLevel = 'info' | 'error';

@Injectable()
export class LoggerProvider {
  private instance_name?: string;
  private log_metadata: any = {};

  private logger_all: winston.Logger;

  constructor(instance_name?: string) {
    if (instance_name) {
      this.instance_name = instance_name;
    }

    const logger_all_transports: winston.transport[] = [];

    if (Environment.is_production || Environment.is_sandbox) {
      logger_all_transports.push(ElasticsearchProvider.loggerTransporter());
    }

    this.logger_all = winston.createLogger({
      defaultMeta: {
        service: ElasticsearchProvider.service_name,
        enviroment: ElasticsearchProvider.environment,
      },
      format: winston.format.json(),
      levels: {
        integration: 0,
        error: 0,
        info: 0,
      },
      transports: logger_all_transports,
    });
  }

  init(instance_name?: string, metadata: any = {}): void {
    this.instance_name = instance_name;
    this.log_metadata = {
      ...metadata,
      context: instance_name,
    };
  }

  public log(title: string, message: any = undefined, level: ConsoleLevel = 'info'): void {
    if (Environment.is_test) {
      return;
    }

    let new_title = this.instance_name ? `${this.instance_name} | ${title}` : title;

    if (Environment.is_development) {
      if (message) console.log(new_title, message);
      else console.log(new_title);
    }

    if (message) {
      new_title += ' ';
    }
    if (typeof message === 'object') {
      new_title += JSON.stringify(message, null, 2);
    }
    if (typeof message === 'string') {
      new_title += message;
    }

    if (Environment.is_production || Environment.is_sandbox) {
      this.logger_all.log(level, new_title, this.log_metadata);
    }
  }

  public error(title: string, err: AxiosError | any): void {
    const levels: ConsoleLevel = 'error';
    const new_title = `${title} - ${err.stack}`;

    let message = '';

    if (err?.isAxiosError) {
      message += ` with status ${err?.response?.status} `;

      switch (typeof err?.response?.data) {
        case 'string':
          message += err?.response?.data;
          break;
        case 'object':
          message += JSON.stringify(err?.response?.data, null, 2);
          break;
        default:
          break;
      }
    }

    this.log(new_title, message, levels);
  }
}
