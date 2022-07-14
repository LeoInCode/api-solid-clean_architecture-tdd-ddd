import { MissingParamError } from '../../errors';
import { RequiredFieldName } from './required-field-validation';

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldName('any_field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('any_field'));
  });

  test('Should not return if validation success', () => {
    const sut = new RequiredFieldName('any_field');
    const error = sut.validate({ any_field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
