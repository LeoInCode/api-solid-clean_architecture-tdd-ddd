import env from '@/main/config/env';
import { DbLoadAccountByToken } from '@/data/usecases';
import { LoadAccountByToken } from '@/domain/usecases';
import { AccountMongoRepository } from '@/infra/db';
import { JwtAdapter } from '@/infra/criptography';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdatper = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdatper, accountMongoRepository);
};
