import { SurveyResultModel } from '@/domain//models';

export type SaveSurveyResulParams = {
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
};

export interface SaveSurveyResult {
  save(data: SaveSurveyResulParams): Promise<SurveyResultModel>;
}
