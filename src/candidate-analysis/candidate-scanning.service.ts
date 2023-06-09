import { Injectable } from "@nestjs/common";
import { OpenaiService } from "../openai/openai.service";
import { Resume } from "../common/entities/resume.interface";
import { INDUSTRIES } from "src/common/constants/industries.constant";

@Injectable()
export class CandidateScanningService {
  constructor(private readonly openaiService: OpenaiService) {}

  public async candidateScanning({ resume }: Resume): Promise<any> {
    //1.  Named entity recognition
    const extractedInformation = await this.extractInformation(resume);

    //2. Recruiter tool for General candidate overview
    const sentimentAnalysisAndGeneralOverview =
      await this.sentimentAnalysisAndGeneralOverview(resume);

    const { generalOverview, sentimentAnalysis } =
      JSON.parse(sentimentAnalysisAndGeneralOverview)?.result || {};

    //3. Job title Classification
    const industryClassification = await this.classifyPerIndustry(
      generalOverview
    );

    return {
      extractedInformation: JSON.parse(extractedInformation),
      generalOverview,
      sentimentAnalysis,
      industryClassification: JSON.parse(industryClassification),
    };
  }

  private async extractInformation(resume: Resume["resume"]): Promise<string> {
    const response = await this.openaiService.generateText(
      `Consider yourself as a RH senior recruiter and extract from this curriculum (${resume}), the most important information
        structured in a valid stringified JSON format with the following attributes in it: candidate name, education,
        certifications, skills and experience.`,
      0
    );

    return response;
  }

  private async sentimentAnalysisAndGeneralOverview(
    resume: Resume["resume"]
  ): Promise<string> {
    const response = await this.openaiService.generateText(
      `You will generate a valid stringified JSON format called 'result' according to the following steps, from this curriculum
        (${resume}), that you will identify as 'The Curriculum'.
        First you will consider yourself as a professional writer, extract the most relevant information from 'The Curriculum'
        return a text with a general overview of the candidate, highlighting the most remarkable skills and experience in a 250
        words paragraph, and add it to an attribute called 'generalOverview' inside 'result'.
        Then you will make a detailed sentiment analysis from 'The Curriculum' in a valid stringified JSON format with the
        following attributes: tone (positive, negative, or neutral), percentage of tone and sentiment analysis (explanation of
        the analysis you did, what you take into consideration to define the tone ? ) with a max length of 80 characters,
        and add it to an attribute called 'sentimentAnalysis' inside 'result'`,
      0.3
    );

    return response;
  }


  private async classifyPerIndustry(resume: Resume["resume"]): Promise<string> {
    const response = await this.openaiService.generateText(
      `Consider yourself as a RH senior recruiter, and set a score from 0 to 100 for this curriculum (${resume}), depending of
      how fit is it for each one of the industries inside the next array (${INDUSTRIES.join(
        ", "
      )}). Set the first five fittest
      job titles in a valid stringified JSON format of an array of elements with the attribute: industry name, and sorted in a
      descendant manner by the score you calculated.`,
      0
    );

    return response;
  }
}
