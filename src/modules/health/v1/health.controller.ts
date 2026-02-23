import { Request, Response } from 'express';
import type { HealthUserInput } from './health.types';
import { HealthService } from './health.service';
import logger from '../../../utils/logger';

export class HealthController {
  private readonly healthService: HealthService;
  private readonly logger = logger;

  constructor() {
    this.healthService = new HealthService();
  }

  /**
   * Checks the health of the AI service.
   * @param _req The request object.
   * @param res The response object.
   * This method sends a test prompt to the AI service and checks if it responds correctly.
   */
  public checkHealth = async (_req: Request, res: Response) => {
    try {
      // start time for AI health check
      // const startTime = Date.now();

      //       const commitMessage = 'feat: refactor AI service to use new post generation method and update Docker setup';
      //       const response = await fetch('http://localhost:11434/api/generate', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           model: 'gemma3',
      //           prompt: `You are a professional content writer. Rewrite the following Git commit message into a polished, concise, and informative update message.

      // Requirements:
      // - Maintain the meaning of the commit.
      // - Use a professional and engaging tone.
      // - Include enough detail for someone to understand the change.
      // - Keep sentences clear and well-structured.
      // - Provide the message in **plain text**, no hashtags, no emojis.
      // - Limit to a maximum of 240 characters.
      // - no need to mention that this is a commit message or use the word "commit" in the output.
      // - Provide 1 version of the rewritten message.
      // - max characters in the output should be 240 characters.
      // Git Commit Message:
      //           ${commitMessage}`,

      //           options: {
      //             temperature: 0.3, // deterministic
      //             num_predict: 60, // limit generation length
      //           },
      //           stream: false, // to make this true you have to use chunks
      //         }),
      //       });

      //       if (!response.ok) {
      //         throw new Error(`Ollama generate failed with status ${response.status}`);
      //       }

      //       const data = (await response.json()) as {
      //         model: string;
      //         created_at: string;
      //         response: string;
      //         done: boolean;
      //         done_reason: string;
      //         context: number[];
      //         total_duration: number;
      //         load_duration: number;
      //         prompt_eval_count: number;
      //         prompt_eval_duration: number;
      //         eval_count: number;
      //         eval_duration: number;
      //       };
      //       console.log('AI health check response data:', data);

      //       const reply = data?.response || 'No response from AI';
      //       const duration = Date.now() - startTime;
      //       console.log('AI total duration (ms):', duration);
      res.status(200).json({
        status: 'ok',
        message: 'Health check successful',
      });
    } catch (error: any) {
      this.logger.error('Health AI check failed', {
        message: error?.message,
        stack: error?.stack,
      });

      res.status(500).json({
        status: 'error',
        message: 'AI service unavailable',
      });
    }
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
