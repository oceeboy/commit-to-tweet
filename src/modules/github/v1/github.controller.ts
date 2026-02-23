import logger from '../../../utils/logger';
import { Request, Response } from 'express';
import { GitHubService } from './github.service';

export class GithubController {
  private readonly logger = logger;

  private readonly githubService: GitHubService;

  constructor() {
    this.githubService = new GitHubService();
  }

  async renderPushPayload(req: Request, res: Response) {
    try {
      const event = req.headers['x-github-event'];
      if (event == 'ping') {
        this.logger.info('Received GitHub ping event');
        return res.status(200).json({ message: 'Received GitHub ping event' });
      }
      const rawPayload = req.body.toString('utf8');
      const parsedPayload = JSON.parse(rawPayload);
      this.logger.info('GitHub push webhook received', {
        event: 'push',
        commitCount: parsedPayload?.commits?.length,
      });
      this.logger.info('Received GitHub webhook:', parsedPayload);
      const result = await this.githubService.handlePush(parsedPayload);
      if (!result.success) {
        this.logger.warn('GitHub push handling failed', {
          reason: result.error,
        });

        return res.status(400).json({
          message: result.message,
          error: result.error,
        });
      }

      return res.status(200).json({
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      this.logger.error('Unhandled error while processing GitHub push webhook', error);

      return res.status(500).json({
        message: 'Internal server error while processing webhook',
      });
    }
  }
}
