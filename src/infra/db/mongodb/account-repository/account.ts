/* eslint-disable @typescript-eslint/naming-convention */
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AddAccountRepository } from '../../../../data/protocols/add-account-respository';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const id = result.insertedId;
    const account = await accountCollection.findOne({
      _id: id,
    });

    const { _id, ...accountWithoudId } = account;
    return Object.assign({}, accountWithoudId, { id: _id }) as any;
  }
}
