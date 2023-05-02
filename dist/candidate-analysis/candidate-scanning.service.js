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
let CandidateScanningService = class CandidateScanningService {
    constructor(openaiService) {
        this.openaiService = openaiService;
    }
    async candidateScanning(resume) {
        const extractedInfo = await this.extractInformation(resume);
        return 'processed';
    }
    async extractInformation(resume) {
        const response = await this.openaiService.generateText(`extract from this curriculum (${resume.resume}) . Important information is divided into these sections: candidate name, education, certifications, skills, and experience. `, 0.7);
        return response;
    }
};
CandidateScanningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [openai_service_1.OpenaiService])
], CandidateScanningService);
exports.CandidateScanningService = CandidateScanningService;
//# sourceMappingURL=candidate-scanning.service.js.map