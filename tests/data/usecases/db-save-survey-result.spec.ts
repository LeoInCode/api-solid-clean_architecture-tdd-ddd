import MockDate from 'mockdate';
import { DbSaveSurveyResult } from '@/data/usecases';
import {
  SaveSurveyResultRepository,
  LoadSurveyResultRepository,
} from '@/data/protocols';
import {
  mockSurveyResultModel,
  mockSurveyResultParams,
  throwError,
} from '@/tests/domain/mocks';
import {
  mockSaveSurveyResultRepository,
  mockLoadSurveyResultRepository,
} from '@/tests/data/mocks';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  );
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = mockSurveyResultParams();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    const surveyResultData = mockSurveyResultParams();
    await sut.save(surveyResultData);
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(
      surveyResultData.surveyId,
      surveyResultData.accountId,
    );
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockSurveyResultParams());
    expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSurveyResultParams());
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
