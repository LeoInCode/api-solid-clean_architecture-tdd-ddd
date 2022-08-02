import MockDate from 'mockdate';
import { LoadSurveyByIdRepository } from '@/data/protocols';
import { DbLoadSurveyById } from '@/data/usecases';
import { mockSurveyModel, throwError } from '@/tests/domain/mocks';
import { mockLoadSurveyByIdRepository } from '@/tests/data/mocks';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyById UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return Survey on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadById('any_id');
    expect(surveys).toEqual(mockSurveyModel());
  });

  test('Should throw if LoadSurveyByIdRepository throww', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(throwError);
    const account = sut.loadById('any_id');
    expect(account).rejects.toThrow();
  });
});
