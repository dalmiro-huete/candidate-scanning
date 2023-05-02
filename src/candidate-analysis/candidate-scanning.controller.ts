import { Body, Controller, Post } from '@nestjs/common';
import { CandidateScanningService } from './candidate-scanning.service';
import { Resume } from '../common/entities/resume.interface';

@Controller('candidate-scanning')
export class CandidateScanningController {
  constructor(
    private readonly candidateScanningService: CandidateScanningService,
  ) {}

  @Post()
  async candidateScanning(@Body() resume: Resume): Promise<string> {
    const response = await this.candidateScanningService.candidateScanning(
      resume,
    );
    return Promise.resolve(response);
  }
}
