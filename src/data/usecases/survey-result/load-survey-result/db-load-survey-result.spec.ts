import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-rusult/load-survey-result-repository';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import { DbLoadSurveyResult } from './db-load-survey-result';

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
  return {
    sut,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load('any_survey_id');
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });
});
