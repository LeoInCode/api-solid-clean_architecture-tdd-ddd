import {
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  LoadAccountByEmailRepository,
  AddAccountRepository,
} from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/tests/domain/mocks';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(
      accountData: AddAccountRepository.Params,
    ): Promise<AddAccountRepository.Result> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository =
  (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements LoadAccountByEmailRepository
    {
      async loadByEmail(email: string): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

export const mockLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub
      implements LoadAccountByTokenRepository
    {
      loadByToken(token: string, role?: string): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }

    return new LoadAccountByTokenRepositoryStub();
  };

export const mockUpdateAccessTokenRepository =
  (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
      implements UpdateAccessTokenRepository
    {
      async updateAccessToken(id: string, token: string): Promise<void> {
        return Promise.resolve();
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };
