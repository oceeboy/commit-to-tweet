import { Router } from 'express';
import { HealthModuleV1 } from './modules/health/v1/health.module';

export class AppModule {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.registerV1();
    this.registerV2();
  }

  private registerV1(): void {
    const v1Router = Router();

    // Register v1 modules here
    new HealthModuleV1(v1Router).register();

    this.router.use('/api/v1', v1Router);
  }

  private registerV2(): void {
    const v2Router = Router();

    // TODO: Register v2 modules here
    // new HealthModuleV2(v2Router).register();

    this.router.use('/api/v2', v2Router);
  }

  public getRouter(): Router {
    return this.router;
  }
}
