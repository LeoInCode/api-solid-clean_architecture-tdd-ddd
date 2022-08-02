import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFielValidation,
  ValidationComposite,
} from '@/validation/validators';
import { EmailValidator } from '@/validation/protocols/email-validator';
import { Validation } from '@/presentation/protocols/validation';
import { makeSignUpValidation } from '@/main/factories/controllers/signup-validation-factory';

jest.mock('@/validation/validators/validation-composite');

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
    makeSignUpValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFielValidation(field));
    }
    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validations.push(new EmailValidation('email', makeEmailValdiator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
