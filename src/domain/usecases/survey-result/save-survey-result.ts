import { SurveyResultModel } from '@/domain//models/survey-result';

export type SaveSurveyResulParams = Omit<SurveyResultModel, 'id'>;

export interface SaveSurveyResult {
  save(data: SaveSurveyResulParams): Promise<SurveyResultModel>;
}
