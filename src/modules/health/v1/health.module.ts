import { Router } from 'express';
import { HealthRoutes } from './health.routes';

export class HealthModuleV1 {
  constructor(private readonly router: Router) {}

  register() {
    this.router.use('/health', new HealthRoutes().getRouter());
  }
}
