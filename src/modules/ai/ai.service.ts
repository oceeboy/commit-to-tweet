import { config } from '../../config/env';
import logger from '../../utils/logger';
import OpenAI from 'openai';
export class AIService {
  private readonly openai: OpenAI;
  private readonly logger = logger;
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  // Example method to generate a response from OpenAI
  async commitToPost(commitMessage: string) {
    const prompt = `
    You are a product marketing assistant.

    Convert the following git commit message into a short,
    friendly public update post (max 2 sentences):

    Commit:
        "${commitMessage}"
        `;
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          //   {
          //     role: 'system',
          //     content: 'You are a helpful assistant.',
          //   },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 150,
      });

      this.logger.info('Generated response from OpenAI', {
        prompt,
        response: response.choices[0]?.message?.content,
      });

      return `${response.choices[0]?.message?.content}`;
    } catch (error) {
      this.logger.error('Error generating response from OpenAI:', error);
      throw new Error('Failed to generate response');
    }
  }
}
