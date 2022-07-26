import { SaveSurveyResulParams } from '@/domain/usecases/survey-result/save-survey-result';

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResulParams): Promise<void>;
}
