import { AIService } from '../../../modules/ai/ai.service';
import type { GitHubPushWebhookCommitsOnly } from './github.types';
import logger from '../../../utils/logger';
export interface HandleResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class GitHubService {
  private readonly aiService: AIService; // Placeholder for AI integration
  private readonly logger = logger;
  constructor() {
    this.aiService = new AIService();
  }

  /**
   * Handle GitHub push webhook
   */
  public async handlePush(payload: GitHubPushWebhookCommitsOnly): Promise<HandleResult<{ commitCount: number }>> {
    try {
      if (!payload || !payload.commits || !Array.isArray(payload.commits)) {
        return {
          success: false,
          message: 'Invalid push payload',
          error: 'Missing commits array',
        };
      }
      this.logger.info('Processing GitHub push event', {
        commitCount: payload.commits.length,
      });
      const commits = payload.commits.map((commit) => {
        return commit;
      });

      // this is where an AI integration could be added to generate a summary or social media post based on the commit messages

      for (const commit of commits) {
        this.logger.info(`Generating post please be patient ${commit.author.name}`, {
          commitMessage: commit.message,
        });

        const post = await this.aiService.generatePostFromCommit(commit.message);
        console.log('Generated post:', post);
      }

      return {
        success: true,
        message: 'Push event processed successfully',
        data: {
          commitCount: payload.commits.length,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to process push event',
        error: error?.message ?? 'Unknown error',
      };
    }
  }

  public async handlePullRequest(payload: any): Promise<HandleResult> {
    try {
      console.log('Pull request event:', payload.action, payload.pull_request?.title);

      return {
        success: true,
        message: 'Pull request event processed',
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to process pull request event',
        error: error?.message,
      };
    }
  }

  public async handleIssueComment(payload: any): Promise<HandleResult> {
    try {
      console.log('Issue comment event:', payload.action, payload.comment?.body);

      return {
        success: true,
        message: 'Issue comment event processed',
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to process issue comment event',
        error: error?.message,
      };
    }
  }

  public async handleFork(payload: any): Promise<HandleResult> {
    try {
      console.log('Fork event:', payload.action, payload.forkee?.full_name);

      return {
        success: true,
        message: 'Fork event processed',
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to process fork event',
        error: error?.message,
      };
    }
  }

  public async handleStar(payload: any): Promise<HandleResult> {
    try {
      console.log('Star event:', payload);

      return {
        success: true,
        message: 'Star event processed',
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to process star event',
        error: error?.message,
      };
    }
  }
}
