import { AccountModel } from '../models/account';

export interface LoadAccountByToken {
  load(acessToken: string, role?: string): Promise<AccountModel>;
}
