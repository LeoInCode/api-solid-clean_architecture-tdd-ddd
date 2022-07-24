import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResulParams } from '@/domain/usecases/survey-result/save-survey-result';

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResulParams): Promise<SurveyResultModel>;
}
