import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/tests/domain/mocks';
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result';
import { SaveSurveyResulParams, SaveSurveyResult } from '@/domain/usecases';

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
    async load(
      surveyId: string,
      accountId: string,
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultStub();
};
