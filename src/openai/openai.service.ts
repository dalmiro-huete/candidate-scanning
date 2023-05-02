import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private client: any;

  constructor() {
    console.log('key', process.env.OPENAI_API_KEY);
    this.client = new OpenAIApi(
      new Configuration({
        apiKey: 'here the apiKey',
      }),
    );
  }

  /**
   * @function generateText
   * @description generateText using openAI
   * @returns { Promise<string> }
   */
  public async generateText(prompt: string): Promise<string> {
    try {
      console.log('prompt before send', prompt);

      const response = await this.client.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 1024,
        temperature: 0.7,
      });

      console.log(response.data);
      return response.data.choices[0].text;
    } catch (e) {
      console.log('ERROR  -> ', e);
    }
  }
}
