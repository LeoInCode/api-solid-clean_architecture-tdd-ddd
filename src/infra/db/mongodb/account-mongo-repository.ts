import { MongoHelper } from '@/infra/db';
import { AccountModel } from '@/domain/models/account';
import { AddAccountParams } from '@/domain/usecases/add-account';
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository';
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository';
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository';
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-respository';

export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository
{
  async add(accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = await accountCollection.findOne({
      _id: result.insertedId,
    });

    return MongoHelper.map(account);
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

  async loadByToken(token: string, role?: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [
        {
          role,
        },
        {
          role: 'admin',
        },
      ],
    });
    return MongoHelper.map(account);
  }
}
