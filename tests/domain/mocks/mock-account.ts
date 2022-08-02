import { AccountModel, AuthenticationModel } from '@/domain/models';
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases';

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAddAccountParams(), {
    id: 'any_id',
  });

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticationModel = (): AuthenticationModel => ({
  accessToken: 'any_token',
  name: 'any_name',
});
