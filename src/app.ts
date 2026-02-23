import express, { type Application } from 'express';
import { AppModule } from './app.module';
import { notFoundHandler } from './middlewares/not-found.middleware';
import path from 'path';
import fs from 'fs';
import logger from './utils/logger';

/**
 * Main application class that sets up the Express server, middleware, and routes.
 * This class is responsible for initializing the application, setting up necessary directories, and configuring middleware and routes.
 * It provides a method to retrieve the Express application instance for use in the main entry point.
 * The application is structured to allow for easy addition of new modules and middleware in the future.
 * Author: Osieta Oghenekewve Gift [Oceeboy]
 * Date: 2026-02-21
 * Version: 1.0
 * License: MIT (free to use, modify, and distribute with proper attribution)
 */

export default class App {
  private app: Application;

  constructor() {
    this.app = express();

    this.initializeDirectories();
    this.setupMiddleware();
    this.setupModules();
    this.setupNotFound();
  }

  private setupMiddleware(): void {
    // this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    logger.info('Middleware setup completed');
  }

  private setupModules(): void {
    const appModule = new AppModule();
    this.app.use(appModule.getRouter());
  }
  private setupNotFound(): void {
    this.app.use(notFoundHandler);
  }
  private initializeDirectories(): void {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  }

  public getApp(): Application {
    return this.app;
  }
}
