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
exports.CandidateScanningService = void 0;
const common_1 = require("@nestjs/common");
const openai_service_1 = require("../openai/openai.service");
const job_titles_constant_1 = require("../common/constants/job-titles.constant");
let CandidateScanningService = class CandidateScanningService {
    constructor(openaiService) {
        this.openaiService = openaiService;
    }
    async candidateScanning({ resume }) {
        const extractedInformation = await this.extractInformation(resume);
        const jobTitleClassification = await this.classifyPerJobTitle(resume);
        const sentimentAnalysis = await this.sentimentAnalysis(resume);
        return {
            extractedInformation: JSON.parse(extractedInformation),
            jobTitleClassification: JSON.parse(jobTitleClassification),
            sentimentAnalysis: JSON.parse(sentimentAnalysis),
        };
    }
    async extractInformation(resume) {
        const response = await this.openaiService.generateText(`Consider yourself a senior recruiter, extract from this curriculum (${resume}), the most important information structured in a valid stringified JSON format with the following attributes in it: candidate name, education, certifications, skills and experience. `, 0);
        return response;
    }
    async classifyPerJobTitle(resume) {
        const response = await this.openaiService.generateText(`Consider yourself a senior recruiter, and set a score for this curriculum (${resume}) from 0 to 100, depending of how fit is it for each one of the job titles inside the next array (${job_titles_constant_1.JOB_TITLES.join(", ")}). Set the first ten fittest job titles in a valid stringified JSON format of an array of elements with the following attributes: job title and score, sorted in a descendant manner by the score you calculated.`, 0);
        return response;
    }
    async sentimentAnalysis(resume) {
        const response = await this.openaiService.generateText(`Make a detailed sentiment analysis from this curriculum (${resume}) structured in a valid stringified JSON format with the following attributes:  tone (positive, negative, or neutral), percentage of tone, and sentiment analysis (explanation of the analysis: what you take into consideration to make the sentimental analysis) with a max length of 50 characters`, 0);
        return response;
    }
};
CandidateScanningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [openai_service_1.OpenaiService])
], CandidateScanningService);
exports.CandidateScanningService = CandidateScanningService;
//# sourceMappingURL=candidate-scanning.service.js.map