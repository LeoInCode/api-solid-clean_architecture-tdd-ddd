import { AddAccount, Authentication } from '@/domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticationResult = (): Authentication.Result => ({
  accessToken: 'any_token',
  name: 'any_name',
});
