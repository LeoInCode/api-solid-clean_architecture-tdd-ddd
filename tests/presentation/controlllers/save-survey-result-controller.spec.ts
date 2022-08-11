import MockDate from 'mockdate';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { SaveSurveyResultController } from '@/presentation/controllers';
import { LoadAnswersBySurvey, SaveSurveyResult } from '@/domain/usecases';
import { mockSurveyResultModel, throwError } from '@/tests/domain/mocks';
import { mockLoadAnswersBySurvey, mockSaveSurveyResultStub } from '@/tests/presentation/mocks';

const mockRequest = (): SaveSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: SaveSurveyResultController;
  loadAnswersBySurveyStub: LoadAnswersBySurvey;
  saveSurveyResultStub: SaveSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyStub = mockLoadAnswersBySurvey();
  const saveSurveyResultStub = mockSaveSurveyResultStub();
  const sut = new SaveSurveyResultController(loadAnswersBySurveyStub, saveSurveyResultStub);
  return {
    sut,
    loadAnswersBySurveyStub,
    saveSurveyResultStub,
  };
};

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call LoadAnswersBySurvey with correct values', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut();
    const loadAnswerSpy = jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers');
    const request = mockRequest();
    await sut.handle(request);
    expect(loadAnswerSpy).toHaveBeenCalledWith(request.surveyId);
  });

  test('Should return 403 if LoadAnswersBySurvey returns null', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut();
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadAnswersBySurvey throws', async () => {
    const { sut, loadAnswersBySurveyStub } = makeSut();
    jest.spyOn(loadAnswersBySurveyStub, 'loadAnswers').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut();
    const request = mockRequest();
    const httpResponse = await sut.handle({
      surveyId: request.surveyId,
      answer: 'wrong_answer',
      accountId: request.accountId,
    });
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')));
  });

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSurveyResultStubSpy = jest.spyOn(saveSurveyResultStub, 'save');
    const request = mockRequest();
    await sut.handle(request);
    expect(saveSurveyResultStubSpy).toHaveBeenCalledWith({
      surveyId: request.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.answer,
    });
  });

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(ok(mockSurveyResultModel()));
  });
});
