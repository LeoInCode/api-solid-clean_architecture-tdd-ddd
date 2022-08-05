import { SurveyResultModel } from '@/domain/models';
import { LoadSurveyResult, SaveSurveyResulParams, SaveSurveyResult } from '@/domain/usecases';
import { mockSurveyResultModel } from '@/tests/domain/mocks';

export const mockSaveSurveyResultStub = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResulParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultStub();
};
