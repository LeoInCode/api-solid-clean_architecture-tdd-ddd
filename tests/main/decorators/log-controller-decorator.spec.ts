import { LogControllerDecorator } from '@/main/decorators';
import { ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { LogErrorRepository } from '@/data/protocols/db/log';
import { mockLogErrorRepository } from '@/tests/data/mocks';
import { mockAccountModel } from '@/tests/domain/mocks';

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccountModel()));
    }
  }

  return new ControllerStub();
};

const mockServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub,
  );

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    await sut.handle(mockRequest());
    expect(handleSpy).toHaveBeenCalledWith(mockRequest());
  });

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockAccountModel()));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(mockServerError()));
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');

    await sut.handle(mockRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
