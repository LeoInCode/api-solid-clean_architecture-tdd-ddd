import {
  LoadAccountByTokenRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  AddAccountRepository,
} from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import { MongoHelper } from '@/infra/db';

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(
    accountData: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return result.insertedId !== null;
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return MongoHelper.map(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const objectId = MongoHelper.parseToObjectId(id);
    await accountCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          accessToken: token,
        },
      },
    );
  }

  async loadByToken(
    token: string,
    role?: string,
  ): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne(
      {
        accessToken: token,
        $or: [
          {
            role,
          },
          {
            role: 'admin',
          },
        ],
      },
      {
        projection: {
          _id: 1,
        },
      },
    );
    return MongoHelper.map(account);
  }
}
