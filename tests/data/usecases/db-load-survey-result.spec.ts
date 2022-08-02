import MockDate from 'mockdate';
import {
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository,
} from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result-protocols';
import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result';
import {
  mockLoadSurveyByIdRepository,
  mockLoadSurveyResultRepository,
} from '@/tests/data/mocks';
import { mockSurveyResultModel, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

let surveyId: string;
let accountId: string;

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  );
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    surveyId = 'any_survey_id';
    accountId = 'any_account_id';
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load(surveyId, accountId);
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyId, accountId);
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.load(surveyId, accountId);
    expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub,
    } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.load(surveyId, accountId);
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId);
  });

  test('Should return SurveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));
    const surveyResult = await sut.load(surveyId, accountId);
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load(surveyId, accountId);
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
