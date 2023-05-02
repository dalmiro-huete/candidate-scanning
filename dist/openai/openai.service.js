"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenaiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let OpenaiService = class OpenaiService {
    constructor() {
        console.log('key', process.env.OPENAI_API_KEY);
        this.client = new openai_1.OpenAIApi(new openai_1.Configuration({
            apiKey: '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',
        }));
    }
    async generateText(prompt) {
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
        }
        catch (e) {
            console.log('ERROR  -> ', e);
        }
    }
};
OpenaiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OpenaiService);
exports.OpenaiService = OpenaiService;
//# sourceMappingURL=openai.service.js.map