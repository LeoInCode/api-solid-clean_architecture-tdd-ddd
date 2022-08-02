import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory';
import { LoginController } from '@/presentation/controllers/login-controller';
import { Controller } from '@/presentation/protocols';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecorator(loginController);
};
