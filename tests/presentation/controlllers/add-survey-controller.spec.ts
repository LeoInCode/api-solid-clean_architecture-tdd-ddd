import MockDate from 'mockdate';
import { HttpRequest, Validation } from '@/presentation/protocols';
import { serverError, badRequest, noContent } from '@/presentation/helpers';
import { AddSurveyController } from '@/presentation/controllers';
import { AddSurvey } from '@/domain/usecases';
import { throwError } from '@/tests/domain/mocks';
import { mockValidation, mockAddSurvey } from '@/tests/presentation/mocks';

const mockRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  },
});

type SutTypes = {
  sut: AddSurveyController;
  validationStub: Validation;
  addSurveyStub: AddSurvey;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidation();
  const addSurveyStub = mockAddSurvey();
  const sut = new AddSurveyController(validationStub, addSurveyStub);
  return {
    sut,
    validationStub,
    addSurveyStub,
  };
};

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut();
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(noContent());
  });
});
