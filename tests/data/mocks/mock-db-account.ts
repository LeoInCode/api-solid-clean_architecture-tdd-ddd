import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository';
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository';
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-respository';
import { AddAccountParams } from '@/domain/usecases/add-account';
import { AccountModel } from '@/domain/models/account';
import { mockAccountModel } from '@/tests/domain/mocks';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountParams): Promise<AccountModel> {
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
