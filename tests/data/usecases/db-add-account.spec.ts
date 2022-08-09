import { CheckAccountByEmailRepository, AddAccountRepository, Hasher } from '@/data/protocols';
import { DbAddAccount } from '@/data/usecases';
import { mockAddAccountParams, throwError } from '@/tests/domain/mocks';
import { mockAddAccountRepository, mockCheckAccountByEmailRepository, mockHasher } from '@/tests/data/mocks';

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  checkAccountByEmailRepositoryStub: CheckAccountByEmailRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const checkAccountByEmailRepositoryStub = mockCheckAccountByEmailRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, checkAccountByEmailRepositoryStub);
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    checkAccountByEmailRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(mockAddAccountParams());
    expect(hasherSpy).toHaveBeenCalledWith('any_password');
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });
  });

  test('Should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.resolve(Promise.resolve(false)));
    const isValid = await sut.add(mockAddAccountParams());
    expect(isValid).toBe(false);
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError);
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const isValid = await sut.add(mockAddAccountParams());
    expect(isValid).toBe(true);
  });

  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    const checkByEmailSpy = jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail');
    await sut.add(mockAddAccountParams());
    expect(checkByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(checkAccountByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true));
    const isValid = await sut.add(mockAddAccountParams());
    expect(isValid).toBe(false);
  });
});
