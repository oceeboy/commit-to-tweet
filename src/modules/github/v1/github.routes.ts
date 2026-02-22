import { Router } from 'express';
import { GithubController } from './github.controller';
import { verifyGithubSignature } from '../../../middlewares';
import express from 'express';

import { asyncHandler } from '../../../utils/async-handler';

export class GithubRoutes {
  public readonly router: Router;
  private readonly githubController: GithubController;

  constructor() {
    this.router = Router();
    this.githubController = new GithubController();
    this.setupRoutes();
  }

  private setupRoutes() {
    // Define your GitHub-related routes here
    // Example:
    // this.router.get('/repos', asyncHandler(this.githubController.getRepos.bind(this.githubController)));
    this.router.post(
      '/',
      express.raw({ type: 'application/json' }),
      verifyGithubSignature,
      asyncHandler(this.githubController.renderPushPayload.bind(this.githubController)),
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}
