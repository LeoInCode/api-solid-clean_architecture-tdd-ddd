import { Encrypter } from '../../../data/protocols/criptography/encrypter';
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/account/load-account-by-email-repository';
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/criptography/jswt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { Controller } from '../../../presentation/protocols';
import env from '../../config/env';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
  const salt = 12;
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const dbAauthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  const loginController = new LoginController(
    dbAauthentication,
    makeLoginValidation(),
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
