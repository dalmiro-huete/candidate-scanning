import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { Resume } from '../common/entities/resume.interface';

@Injectable()
export class CandidateScanningService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async candidateScanning(resume: Resume): Promise<string> {
    //1.  extract important info from resume
    const extractedInfo = await this.extractInformation(resume);
    console.log('extractedInfo is', extractedInfo);

    //2.  second step

    return 'processed';
  }

  private async extractInformation(resume: Resume): Promise<string> {
    console.log('calling extractInformation');

    const response = await this.openaiService.generateText(
      `extract from this curriculum (${resume.resume}) . Important information is divided into these sections: candidate name, education, certifications, skills, and experience. `,
    );

    return response;
  }
}
