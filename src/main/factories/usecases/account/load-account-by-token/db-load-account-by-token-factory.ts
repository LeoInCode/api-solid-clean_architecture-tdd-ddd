import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token';
import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository';
import { JwtAdapter } from '@/infra/criptography/jswt-adapter/jwt-adapter';
import env from '@/main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdatper = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdatper, accountMongoRepository);
};
