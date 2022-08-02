import env from '@/main/config/env';
import { Authentication } from '@/domain/usecases';
import { DbAuthentication } from '@/data/usecases';
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography';
import { AccountMongoRepository } from '@/infra/db';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
