import { Request, Response } from 'express';
import type { HealthUserInput } from './health.types';

export class HealthController {
  public async checkHealth(req: Request, res: Response) {
    res.status(200).json({ status: 'ok', message: 'Health check successful' });
  }

  public async checkDatabase(req: Request, res: Response): Promise<void> {
    const dbStatus = await this.simulateDatabaseCheck();
    if (dbStatus) {
      res.status(200).json({ status: 'ok', message: 'Database connection successful' });
    } else {
      res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
  }

  public async addUser(req: Request, res: Response): Promise<void> {
    // const postId = (req as any).validatedParams.id; // Access the validated params
    // console.log(`Adding user to post with ID: ${postId}`);
    const { username, email } = (req as any).validatedBody as HealthUserInput; // Access the validated body

    const newUser = { id: Date.now(), username, email };
    res.status(201).json({ status: 'ok', message: 'User added successfully', user: newUser });
  }

  private async simulateDatabaseCheck(): Promise<boolean> {
    // Simulate a database check with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}
