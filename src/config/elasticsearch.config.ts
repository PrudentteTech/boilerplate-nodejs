export default {
  logs: {
    url: process.env?.ELASTICSEARCH_LOG_URL,
    username: process.env?.ELASTICSEARCH_LOG_USER,
    password: process.env?.ELASTICSEARCH_LOG_PASSWORD,
  },
  apm: {
    url: process.env?.ELASTICSEARCH_APM_URL,
    secret_token: process.env?.ELASTICSEARCH_APM_SECRET_TOKEN,
  },
};
