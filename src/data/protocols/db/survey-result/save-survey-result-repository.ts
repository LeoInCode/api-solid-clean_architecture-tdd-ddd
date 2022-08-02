import { SaveSurveyResulParams } from '@/domain/usecases';

export interface SaveSurveyResultRepository {
  save(surveyData: SaveSurveyResulParams): Promise<void>;
}
