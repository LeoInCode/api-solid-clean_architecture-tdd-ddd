import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import {
  SaveSurveyResulParams,
  SaveSurveyResult,
} from '@/domain/usecases/survey-result/save-survey-result';

export const mockSaveSurveyResultStub = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResulParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};
