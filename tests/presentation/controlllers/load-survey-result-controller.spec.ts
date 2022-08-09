import MockDate from 'mockdate';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';
import { CheckSurveyById, LoadSurveyResult } from '@/domain/usecases';
import { mockCheckSurveyById, mockLoadSurveyResult } from '@/tests/presentation/mocks';
import { throwError, mockSurveyResultModel } from '@/tests/domain/mocks';

const mockRequest = (): LoadSurveyResultController.Request => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: LoadSurveyResultController;
  checkSurveyByIdStub: CheckSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const checkSurveyByIdStub = mockCheckSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(checkSurveyByIdStub, loadSurveyResultStub);
  return {
    sut,
    checkSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call CheckSurveyById with correct value', async () => {
    const { sut, checkSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(checkSurveyByIdStub, 'checkById');
    const request = mockRequest();
    await sut.handle(request);
    expect(loadByIdSpy).toHaveBeenCalledWith(request.surveyId);
  });

  test('Should return 403 if CheckSurveyById returns null', async () => {
    const { sut, checkSurveyByIdStub } = makeSut();
    jest.spyOn(checkSurveyByIdStub, 'checkById').mockReturnValueOnce(Promise.resolve(false));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if CheckSurveyById throws', async () => {
    const { sut, checkSurveyByIdStub } = makeSut();
    jest.spyOn(checkSurveyByIdStub, 'checkById').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    const request = mockRequest();
    await sut.handle(request);
    expect(loadSpy).toHaveBeenCalledWith(request.surveyId, request.accountId);
  });

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(ok(mockSurveyResultModel()));
  });
});
