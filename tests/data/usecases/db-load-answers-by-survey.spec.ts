import { LoadSurveyByIdRepository } from '@/data/protocols';
import { DbLoadAnswersBySurvey } from '@/data/usecases';
import { mockSurveyModel, throwError } from '@/tests/domain/mocks';
import { mockLoadSurveyByIdRepository } from '@/tests/data/mocks';

type SutTypes = {
  sut: DbLoadAnswersBySurvey;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadAnswersBySurvey UseCase', () => {
  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadAnswers('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return answers on success', async () => {
    const { sut } = makeSut();
    const surveys = mockSurveyModel();
    const answers = await sut.loadAnswers('any_id');
    expect(answers).toEqual([surveys.answers[0].answer, surveys.answers[1].answer]);
  });

  test('Should return empty array if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));
    const answers = await sut.loadAnswers('any_id');
    expect(answers).toEqual([]);
  });

  test('Should throw if LoadSurveyByIdRepository throww', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);
    const account = sut.loadAnswers('any_id');
    expect(account).rejects.toThrow();
  });
});
