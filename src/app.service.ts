import { Injectable } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(private health: HealthCheckService, private memory: MemoryHealthIndicator) {}

  getHello(): string {
    return 'Hello from SERVICE_NAME service';
  }

  getReadyz(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
