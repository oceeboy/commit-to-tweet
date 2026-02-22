import { config } from '../../config/env';
import logger from '../../utils/logger';

export class AIService {
  private readonly logger = logger;
  constructor() {}

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
      //   this.logger.info('Generated response from OpenAI', {
      //     prompt,
      //     response: response.choices[0]?.message?.content,
      //   });

      //   return `${response.choices[0]?.message?.content}`;
      return `Generated post for commit: "${commitMessage}"`; // Placeholder response
    } catch (error) {
      this.logger.error('Error generating response from OpenAI:', error);
      throw new Error('Failed to generate response');
    }
  }
  async generatePostFromCommit(commitMessage: string) {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: `
  Turn this GitHub commit into a short, professional update post:
  
  "${commitMessage}"
        `,
        stream: false,
      }),
    });

    const data = await response.json();
    return data || `Generated post for commit: "${commitMessage}"`; // Fallback response
  }
}
