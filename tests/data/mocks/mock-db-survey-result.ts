import { SaveSurveyResultRepository, LoadSurveyResultRepository } from '@/data/protocols';
import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResulParams } from '@/domain/usecases';
import { mockSurveyResultModel } from '@/tests/domain/mocks';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResulParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};
