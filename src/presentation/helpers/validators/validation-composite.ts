import { Validation } from '../../protocols/validation';

export class ValidationComposite implements Validation {
  private readonly validations: Validation[];

  constructor(validations: Validation[]) {
    this.validations = validations;
  }

  validate(input: any): Error {
    for (const validtion of this.validations) {
      const error = validtion.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
