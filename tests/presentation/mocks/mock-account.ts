import { AccountModel } from '@/domain/models/account';
import { AuthenticationModel } from '@/domain/models/authentication';
import {
  mockAccountModel,
  mockAuthenticationModel,
} from '@/tests/domain/mocks';
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/account/add-account';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/account/authentication';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
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
