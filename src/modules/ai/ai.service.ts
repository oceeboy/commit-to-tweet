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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma3',
        prompt: `You are a professional content writer. Rewrite the following Git commit message into a polished, concise, and informative update message. 

Requirements:
- Maintain the meaning of the commit.
- Use a professional and engaging tone.
- Include enough detail for someone to understand the change.
- Keep sentences clear and well-structured.
- Provide the message in **plain text**, no hashtags, no emojis.
- Limit to a maximum of 240 characters.
- no need to mention that this is a commit message or use the word "commit" in the output.
- Provide 1 version of the rewritten message.
- max characters in the output should be 240 characters. 
Git Commit Message:
        ${commitMessage}`,

        options: {
          temperature: 0.3, // deterministic
          num_predict: 60, // limit generation length
        },
        stream: false, // to make this true you have to use chunks
      }),
    });
    this.logger.info('Received response from local AI service', {
      status: response.status,
      statusText: response.statusText,
    });

    const data = (await response.json()) as {
      model: string;
      created_at: string;
      response: string;
      done: boolean;
      done_reason: string;
      context: number[];
      total_duration: number;
      load_duration: number;
      prompt_eval_count: number;
      prompt_eval_duration: number;
      eval_count: number;
      eval_duration: number;
    };
    return data.response || `Generated post for commit: "${commitMessage}"`; // Fallback response
  }
}
