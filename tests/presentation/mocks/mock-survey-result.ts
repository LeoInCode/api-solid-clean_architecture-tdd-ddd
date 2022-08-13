import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { mockSurveyResultModel } from '@/tests/domain/mocks';

export const mockSaveSurveyResultStub = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load(surveyId: string, accountId: string): Promise<LoadSurveyResult.Result> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultStub();
};
