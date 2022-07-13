/* eslint-disable @typescript-eslint/naming-convention */
import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoudId } = collection;
    return Object.assign({}, collectionWithoudId, { id: _id });
  },
};
