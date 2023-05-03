import { Injectable } from "@nestjs/common";
import { OpenaiService } from "../openai/openai.service";
import { Resume } from "../common/entities/resume.interface";
import { JOB_TITLES } from "src/common/constants/job-titles.constant";

@Injectable()
export class CandidateScanningService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async candidateScanning({ resume }: Resume): Promise<any> {
    //1.  Named entity recognition
    const extractedInformation = await this.extractInformation(resume);

    //2.  Sentiment analysis

    const jobTitleClassification = await this.classifyPerJobTitle(resume);

    //4. Recruiter tool for General candidate overview

    // TODO generate final response
    return {
      extractedInformation: JSON.parse(extractedInformation),
      jobTitleClassification: JSON.parse(jobTitleClassification),
    };
  }

  private async extractInformation(resume: Resume["resume"]): Promise<string> {
    const response = await this.openaiService.generateText(
      `Consider yourself a senior recruiter, extract from this curriculum (${resume}), the most important information structured in a valid stringified JSON format with the following attributes in it: candidate name, education, certifications, skills and experience. `,
      0
    );

    return response;
  }

  private async classifyPerJobTitle(resume: Resume["resume"]): Promise<string> {
    // TODO:
    // Identify limit of elements in the JOB_TITLE array before sending error. (Currently if all the jobs are uncommented it throws 400)
    // Could it be because of the prompt length? May there be another elements like timeout processing?
    // Would the length of the resume result in a similar error if it is too long?
    const response = await this.openaiService.generateText(
      `Consider yourself a senior recruiter, and set a score for this curriculum (${resume}) from 0 to 100, depending of how fit is it for each one of the job titles inside the next array (${JOB_TITLES.join(
        ", "
      )}). Set the first ten fittest job titles in a valid stringified JSON format of an array of elements with the following attributes: job title and score, sorted in a descendant manner by the score you calculated.`,
      0
    );

    return response;
  }
}
