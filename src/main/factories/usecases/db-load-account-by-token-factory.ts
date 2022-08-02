import { LoadAccountByToken } from '@/domain/usecases';
import { DbLoadAccountByToken } from '@/data/usecases/db-load-account-by-token';
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter';
import env from '@/main/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdatper = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdatper, accountMongoRepository);
};
