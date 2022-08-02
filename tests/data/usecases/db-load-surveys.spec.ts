import MockDate from 'mockdate';
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys';
import { LoadSurveysRepository } from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols';
import { mockSurveyModels, throwError } from '@/tests/domain/mocks';
import { mockLoadSurveysRepository } from '@/tests/data/mocks';

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
    await sut.load('any_id');
    expect(loadAllSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load('any_id');
    expect(surveys).toEqual(mockSurveyModels());
  });

  test('Should throw if LoadSurveysRepository throww', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(throwError);
    const account = sut.load('any_id');
    expect(account).rejects.toThrow();
  });
});
