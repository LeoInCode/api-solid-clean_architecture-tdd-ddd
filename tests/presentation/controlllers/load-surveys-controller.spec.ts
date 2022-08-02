import MockDate from 'mockdate';
import { HttpRequest } from '@/presentation/protocols';
import { noContent, ok, serverError } from '@/presentation/helpers';
import { LoadSurveysController } from '@/presentation/controllers';
import { LoadSurveys } from '@/domain/usecases';
import { mockSurveyModels, throwError } from '@/tests/domain/mocks';
import { mockLoadSurveys } from '@/tests/presentation/mocks';

const mockRequest = (): HttpRequest => ({ accountId: 'any_account_id' });

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId);
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockSurveyModels()));
  });

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });
});
