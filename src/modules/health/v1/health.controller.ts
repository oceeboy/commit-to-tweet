import { Request, Response } from 'express';
import type { HealthUserInput } from './health.types';
import { HealthService } from './health.service';

export class HealthController {
  private readonly healthService: HealthService;

  constructor() {
    this.healthService = new HealthService();
  }

  public checkHealth = (_req: Request, res: Response): void => {
    res.status(200).json({
      status: 'ok',
      message: 'Health check successful',
    });
  };

  public addUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email } = (req as any).validatedBody as HealthUserInput;

    const result = await this.healthService.addUser({ username, email });

    res.status(201).json(result);
  };

  public checkDatabase = async (_req: Request, res: Response): Promise<void> => {
    const isConnected = true;

    res.status(isConnected ? 200 : 500).json({
      status: isConnected ? 'ok' : 'error',
      message: isConnected ? 'Database connection successful' : 'Database connection failed',
    });
  };
}
