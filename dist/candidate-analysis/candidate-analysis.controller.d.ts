import { CandidateAnalysisService } from './candidate-analysis.service';
export declare class CandidateAnalysisController {
    private readonly candidateAnalysisService;
    constructor(candidateAnalysisService: CandidateAnalysisService);
    candidateAnalysis(resume: string): Promise<string>;
}
