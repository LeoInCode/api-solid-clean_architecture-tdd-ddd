/* eslint-disable @typescript-eslint/naming-convention */
import { Collection, MongoClient, ObjectId } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map: (collection: any): any => {
    if (!collection) {
      return null;
    }
    const { _id, ...collectionWithoudId } = collection;
    return Object.assign({}, collectionWithoudId, { id: _id });
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => MongoHelper.map(c));
  },

  parseToObjectId(value: string): ObjectId {
    return new ObjectId(value);
  },
};
