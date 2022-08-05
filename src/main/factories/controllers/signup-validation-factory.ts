import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFielValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFielValidation(field));
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
