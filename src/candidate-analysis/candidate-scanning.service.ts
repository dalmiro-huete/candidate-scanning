import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { Resume } from '../common/entities/resume.interface';

@Injectable()
export class CandidateScanningService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async candidateScanning(resume: Resume): Promise<string> {
    //1.  Named entity recognition
    const extractedInfo = await this.extractInformation(resume);

    //2.  Sentiment analysis
    //3. Text Classification
    //4. Recruiter tool for General candidate overview

    // TODO generate final response
    return 'processed';
  }

  private async extractInformation(resume: Resume): Promise<string> {
    const response = await this.openaiService.generateText(
      `extract from this curriculum (${resume.resume}) . Important information is divided into these sections: candidate name, education, certifications, skills, and experience. `,
    0.7);

    return response;
  }
}
