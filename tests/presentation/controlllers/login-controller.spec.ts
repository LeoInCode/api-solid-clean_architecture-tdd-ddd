import { LoginController } from '@/presentation/controllers';
import { Validation } from '@/presentation/protocols';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers';
import { MissingParamError } from '@/presentation/errors';
import { Authentication } from '@/domain/usecases';
import { mockAuthenticationModel, throwError } from '@/tests/domain/mocks';
import { mockAuthentication, mockValidation } from '@/tests/presentation/mocks';

const mockRequest = (): LoginController.Request => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

type SutTypes = {
  sut: LoginController;
  authenticationStub: Authentication;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();
  const sut = new LoginController(authenticationStub, validationStub);
  return {
    sut,
    authenticationStub,
    validationStub,
  };
};

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const request = mockRequest();
    await sut.handle(request);
    expect(authSpy).toHaveBeenCalledWith({
      email: request.email,
      password: request.password,
    });
  });

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(() => Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError);
    const httpReponse = await sut.handle(mockRequest());
    expect(httpReponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockAuthenticationModel()));
  });

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const request = mockRequest();
    await sut.handle(request);
    expect(validateSpy).toHaveBeenCalledWith(request);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_field')),
    );
  });
});
