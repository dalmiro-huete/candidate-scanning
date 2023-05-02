export declare class OpenaiService {
    private client;
    constructor();
    generateText(prompt: string): Promise<string>;
}
