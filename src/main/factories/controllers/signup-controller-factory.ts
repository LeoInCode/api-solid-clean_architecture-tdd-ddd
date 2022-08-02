import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeDbAddAccount } from '@/main/factories/usecases/db-add-account-factory';
import { makeDbAuthentication } from '@/main/factories/usecases/db-authentication-factory';
import { SignUpController } from '@/presentation/controllers/singup-controller';
import { Controller } from '@/presentation/protocols';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(signUpController);
};
