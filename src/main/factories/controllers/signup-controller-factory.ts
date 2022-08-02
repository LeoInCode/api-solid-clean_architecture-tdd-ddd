import { makeLogControllerDecorator } from '@/main/factories/decorators';
import {
  makeDbAddAccount,
  makeDbAuthentication,
} from '@/main/factories/usecases';
import { makeSignUpValidation } from '@/main/factories/controllers';
import { SignUpController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(signUpController);
};
