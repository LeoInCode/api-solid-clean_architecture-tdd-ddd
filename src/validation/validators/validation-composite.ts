import { Validation } from '../../presentation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): Error {
    for (const validtion of this.validations) {
      const error = validtion.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
