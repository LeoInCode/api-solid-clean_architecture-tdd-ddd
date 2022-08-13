import { LoadAnswersBySurveyRepository } from '@/data/protocols';
import { DbLoadAnswersBySurvey } from '@/data/usecases';
import { mockSurveyModel, throwError } from '@/tests/domain/mocks';
import { mockLoadAnswersBySurvey } from '@/tests/presentation/mocks';

type SutTypes = {
  sut: DbLoadAnswersBySurvey;
  loadLoadAnswersBySurveyStub: LoadAnswersBySurveyRepository;
};

const makeSut = (): SutTypes => {
  const loadLoadAnswersBySurveyStub = mockLoadAnswersBySurvey();
  const sut = new DbLoadAnswersBySurvey(loadLoadAnswersBySurveyStub);
  return {
    sut,
    loadLoadAnswersBySurveyStub,
  };
};

describe('DbLoadAnswersBySurvey UseCase', () => {
  test('Should call LoadLoadAnswersBySurvey with correct id', async () => {
    const { sut, loadLoadAnswersBySurveyStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadLoadAnswersBySurveyStub, 'loadAnswers');
    await sut.loadAnswers('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return answers on success', async () => {
    const { sut } = makeSut();
    const surveys = mockSurveyModel();
    const answers = await sut.loadAnswers('any_id');
    expect(answers).toEqual([surveys.answers[0].answer, surveys.answers[1].answer]);
  });

  test('Should return empty array if LoadLoadAnswersBySurvey returns []', async () => {
    const { sut, loadLoadAnswersBySurveyStub } = makeSut();
    jest.spyOn(loadLoadAnswersBySurveyStub, 'loadAnswers').mockReturnValueOnce(Promise.resolve([]));
    const answers = await sut.loadAnswers('any_id');
    expect(answers).toEqual([]);
  });

  test('Should throw if LoadLoadAnswersBySurvey throw', async () => {
    const { sut, loadLoadAnswersBySurveyStub } = makeSut();
    jest.spyOn(loadLoadAnswersBySurveyStub, 'loadAnswers').mockImplementationOnce(throwError);
    const account = sut.loadAnswers('any_id');
    expect(account).rejects.toThrow();
  });
});
