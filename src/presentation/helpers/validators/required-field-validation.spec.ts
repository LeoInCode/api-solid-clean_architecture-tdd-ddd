import { MissingParamError } from '../../errors';
import { RequiredFieldName } from './required-field-validation';

const makeSut = (): RequiredFieldName => {
  return new RequiredFieldName('any_field');
};

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('any_field'));
  });

  test('Should not return if validation success', () => {
    const sut = makeSut();
    const error = sut.validate({ any_field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
