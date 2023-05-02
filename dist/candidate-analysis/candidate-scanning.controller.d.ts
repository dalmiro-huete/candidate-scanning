import { CandidateScanningService } from './candidate-scanning.service';
import { Resume } from '../common/entities/resume.interface';
export declare class CandidateScanningController {
    private readonly candidateScanningService;
    constructor(candidateScanningService: CandidateScanningService);
    candidateScanning(resume: Resume): Promise<string>;
}
