import { OpenaiService } from '../openai/openai.service';
import { Resume } from '../common/entities/resume.interface';
export declare class CandidateScanningService {
    private readonly openaiService;
    constructor(openaiService: OpenaiService);
    candidateScanning({ resume }: Resume): Promise<any>;
    private extractInformation;
    private generalOverview;
    private classifyPerJobTitle;
    private sentimentAnalysis;
}
