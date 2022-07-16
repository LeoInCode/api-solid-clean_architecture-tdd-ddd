import {
  EmailValidation,
  RequiredFielValidation,
  ValidationComposite,
} from '../../../../../validation/validators';
import { Validation } from '../../../../../presentation/protocols/validation';
import { EmailValidator } from '../../../../../validation/protocols/email-validator';
import { makeLoginValidation } from './login-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

const makeEmailValdiator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFielValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailValdiator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
