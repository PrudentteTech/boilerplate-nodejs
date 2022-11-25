import * as APM from 'elastic-apm-node';
import { ElasticsearchTransport } from 'winston-elasticsearch';

import Environment from '../../utils/environment.util';
import elasticsearch_config from '../../../config/elasticsearch.config';

export const service_name = 'SERVICE_NAME-service';
export const environment = Environment.enviroment;

export let apm: APM.Agent;

if (Environment.is_sandbox || Environment.is_production) {
  apm = APM?.start({
    serviceName: service_name,
    environment: process.env.NODE_ENV?.trim(),
    serverUrl: elasticsearch_config.apm.url,
    secretToken: elasticsearch_config.apm.secret_token,
    captureBody: 'all',
    active: true,
    usePathAsTransactionName: true,
    logUncaughtExceptions: true,
    transactionIgnoreUrls: ['/readyz'],
  });

  console.log('APM started');
}

export function loggerTransporter(): ElasticsearchTransport {
  const transport = new ElasticsearchTransport({
    apm,
    level: 'info',
    clientOpts: {
      name: service_name,
      node: elasticsearch_config.logs.url,
      auth: {
        username: elasticsearch_config.logs.username!,
        password: elasticsearch_config.logs.password!,
      },
    },
  });

  transport.on('error', err => console.log('Error on elasticsearch transport:', err));

  return transport;
}
