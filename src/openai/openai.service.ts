import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private client: any;

  constructor() {
    this.client = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY
      })
    );
  }

  /**
   * @function module to generateText
   * @description generateText using openAI
   * @returns { Promise<string> }
   */
  public async generateText(
    prompt: string,
    temperature: number
  ): Promise<string> {
    try {
      const response = await this.client.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 3000,
        temperature
      });

      return response.data.choices[0].text;
    } catch (e) {
      console.log('ERROR  -> ', e);
      throw e;
    }
  }
}
