import { CheckSurveyByIdRepository } from '@/data/protocols';
import { DbCheckSurveyById } from '@/data/usecases';
import { throwError } from '@/tests/domain/mocks';
import { mockCheckSurveyByIdRepository } from '@/tests/data/mocks';

type SutTypes = {
  sut: DbCheckSurveyById;
  checkSurveyByIdRepositoryStub: CheckSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositoryStub = mockCheckSurveyByIdRepository();
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositoryStub);
  return {
    sut,
    checkSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyById UseCase', () => {
  test('Should call CheckSurveyByIdRepository with correct id', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut();
    const checkByIdSpy = jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById');
    await sut.checkById('any_id');
    expect(checkByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return true if CheckSurveyByIdRepository returns true', async () => {
    const { sut } = makeSut();
    const exists = await sut.checkById('any_id');
    expect(exists).toEqual(true);
  });

  test('Should return false if CheckSurveyByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockReturnValueOnce(Promise.resolve(false));
    const exists = await sut.checkById('wrong_id');
    expect(exists).toEqual(false);
  });

  test('Should throw if CheckSurveyByIdRepository throww', async () => {
    const { sut, checkSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(checkSurveyByIdRepositoryStub, 'checkById').mockImplementationOnce(throwError);
    const exists = sut.checkById('any_id');
    expect(exists).rejects.toThrow();
  });
});
