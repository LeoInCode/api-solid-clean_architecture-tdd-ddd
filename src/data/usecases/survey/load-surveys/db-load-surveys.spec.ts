import MockDate from 'mockdate';
import { mockSurveyModels, throwError } from '@/domain/test';
import { DbLoadSurveys } from './db-load-surveys';
import { LoadSurveysRepository } from './db-load-surveys-protocols';
import { mockLoadSurveysRepository } from '@/data/test';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(mockSurveyModels());
  });

  test('Should throw if LoadSurveysRepository throww', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(throwError);
    const account = sut.load();
    expect(account).rejects.toThrow();
  });
});
