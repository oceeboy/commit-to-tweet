import { Router } from 'express';
import { HealthController } from './health.controller';
import { asyncHandler } from '../../../utils/async-handler';
import { HealthUserSchema } from './health.validator';

import { testMiddleware, validate } from '../../../middlewares';

export class HealthRoutes {
  public readonly router: Router;
  public readonly healthController: HealthController;

  constructor() {
    this.healthController = new HealthController();
    this.router = Router();

    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/', testMiddleware.bind(this), this.healthController.checkHealth.bind(this.healthController));
    this.router.get('/database', testMiddleware.bind(this), asyncHandler(this.healthController.checkDatabase.bind(this.healthController)));
    this.router.post(
      '/user',
      testMiddleware.bind(this),
      validate(HealthUserSchema),
      asyncHandler(this.healthController.addUser.bind(this.healthController)),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
