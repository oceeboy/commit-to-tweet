import { Router } from 'express';
import { GithubRoutes } from './github.routes';

export class GithubModuleV1 {
  public readonly routes: GithubRoutes;

  constructor(private readonly router: Router) {
    this.routes = new GithubRoutes();
  }

  register() {
    this.router.use('/github', this.routes.getRouter());
  }
}
