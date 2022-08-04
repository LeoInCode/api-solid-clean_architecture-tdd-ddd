import { AccountModel } from '@/domain/models';
import {
  LoadAccountByToken,
  Authentication,
  AddAccount,
} from '@/domain/usecases';
import {
  mockAccountModel,
  mockAuthenticationResult,
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
      authentication: Authentication.Params,
    ): Promise<Authentication.Result> {
      return Promise.resolve(mockAuthenticationResult());
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
