import { AccountModel, AuthenticationModel } from '@/domain/models';
import {
  LoadAccountByToken,
  Authentication,
  AuthenticationParams,
  AddAccount,
} from '@/domain/usecases';
import {
  mockAccountModel,
  mockAuthenticationModel,
} from '@/tests/domain/mocks';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccount.Params): Promise<AddAccount.Result> {
      return Promise.resolve(true);
    }
  }
  return new AddAccountStub();
};

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(
      authentication: AuthenticationParams,
    ): Promise<AuthenticationModel> {
      return Promise.resolve(mockAuthenticationModel());
    }
  }
  return new AuthenticationStub();
};

export const mockLoadAccontByToken = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
