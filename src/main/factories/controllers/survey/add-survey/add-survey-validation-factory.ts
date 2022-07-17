import {
  RequiredFielValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols/validation';

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFielValidation(field));
  }

  return new ValidationComposite(validations);
};
