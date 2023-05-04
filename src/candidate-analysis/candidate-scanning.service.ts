import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { Resume } from '../common/entities/resume.interface';
import { JOB_TITLES } from 'src/common/constants/job-titles.constant';

@Injectable()
export class CandidateScanningService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async candidateScanning({ resume }: Resume): Promise<any> {
    //1.  Named entity recognition
    const extractedInformation = await this.extractInformation(resume);

    //2. Job title Classification
    const jobTitleClassification = await this.classifyPerJobTitle(resume);

    //3.  Sentiment analysis
    const sentimentAnalysis = await this.sentimentAnalysis(resume);

    //4. Recruiter tool for General candidate overview
    const generalOverview = await this.generalOverview(resume);

    // TODO generate final response
    return {
      extractedInformation: JSON.parse(extractedInformation),
      jobTitleClassification: JSON.parse(jobTitleClassification),
      generalOverview: JSON.parse(generalOverview),
      sentimentAnalysis: JSON.parse(sentimentAnalysis)
    };
  }

  private async extractInformation(resume: Resume['resume']): Promise<string> {
    const response = await this.openaiService.generateText(
      `Consider yourself a senior recruiter, extract from this curriculum (${resume}), 
      the most important information structured in a valid stringified JSON format with the following attributes in it: candidate name, education, certifications, skills and experience. `,
      0
    );

    return response;
  }
  private async generalOverview(resume: Resume['resume']): Promise<string> {
    const response = await this.openaiService.generateText(
      `Considering yourselve as a senior recruiter, extract from this curriculum ${resume}, the most relevant information and return a string value with a general overview of the candidate, highlighting candidate most remarkable skills and experience in a 250 words paragraph. Structure information in a valid JSON stringified format`,
      0
    );

    return response;
  }

  private async classifyPerJobTitle(resume: Resume['resume']): Promise<string> {
    // TODO:
    // Identify limit of elements in the JOB_TITLE array before sending error. (Currently if all the jobs are uncommented it throws 400)
    // Could it be because of the prompt length? May there be another elements like timeout processing?
    // Would the length of the resume result in a similar error if it is too long?
    const response = await this.openaiService.generateText(
      `Consider yourself a senior recruiter, and set a score for this curriculum (${resume}) from 0 to 100, depending of how fit is it for each one of the job titles inside the next array (${JOB_TITLES.join(
        ', '
      )}). Set the first ten fittest job titles in a valid stringified JSON format of an array of elements with the following attributes: job title and score, sorted in a descendant manner by the score you calculated.`,
      0
    );

    return response;
  }

  private async sentimentAnalysis(resume: Resume['resume']): Promise<string> {
    const response = await this.openaiService.generateText(
      `Make a detailed sentiment analysis from this curriculum (${resume}) structured in a valid stringified JSON format with the following attributes:  tone (positive, negative, or neutral), percentage of tone, and sentiment analysis (explanation of the analysis: what you take into consideration to make the sentimental analysis) with a max length of 50 characters`,
      0
    );

    return response;
  }
}
