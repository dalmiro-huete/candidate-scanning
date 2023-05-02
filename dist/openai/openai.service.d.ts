export declare class OpenaiService {
    private client;
    constructor();
    generateText(prompt: string, temperature: number): Promise<string>;
}
