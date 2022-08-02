import MockDate from 'mockdate';
import { HttpRequest } from '@/presentation/protocols';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';
import { LoadSurveyById, LoadSurveyResult } from '@/domain/usecases';
import {
  mockLoadSurveyById,
  mockLoadSurveyResult,
} from '@/tests/presentation/mocks';
import { throwError, mockSurveyResultModel } from '@/tests/domain/mocks';

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  loadSurveyResultStub: LoadSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub,
  );
  return {
    sut,
    loadSurveyByIdStub,
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
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(mockRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id');
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
