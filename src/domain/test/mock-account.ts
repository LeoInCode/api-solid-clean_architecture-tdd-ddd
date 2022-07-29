import { AddAccountParams } from '@/data/usecases/account/add-account/db-add-account-protocols';
import {
  AuthenticationModel,
  AuthenticationParams,
} from '@/data/usecases/account/authentication/db-authentication-protocols';
import { AccountModel } from '@/presentation/middlewares/auth-middleware-protocols';

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
