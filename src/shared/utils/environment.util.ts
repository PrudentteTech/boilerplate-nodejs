class EnvironmentUtil {
  private enviroment_data = process.env.NODE_ENV?.trim() as EnumEnvironment;

  get enviroment() {
    return this.enviroment_data;
  }

  get is_test() {
    return this.enviroment_data === 'test';
  }

  get is_development() {
    return this.enviroment_data === 'development';
  }

  get is_production() {
    return this.enviroment_data === 'production';
  }

  get is_sandbox() {
    return this.enviroment_data === 'sandbox';
  }
}

export default new EnvironmentUtil();

export enum EnumEnvironment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
  SANDBOX = 'sandbox',
}
