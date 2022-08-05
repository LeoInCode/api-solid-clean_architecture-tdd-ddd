import {
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  LoadAccountByEmailRepository,
  AddAccountRepository,
} from '@/data/protocols';

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
      return Promise.resolve(true);
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'any_password',
      });
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    loadByToken(token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
      return Promise.resolve({
        id: 'any_id',
      });
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};
