import { MongoHelper } from './mongo-helper';

describe('Mongo Helper', () => {
  test('Should return null on map if a collection was null', () => {
    const collectionMapped = MongoHelper.map(null);
    expect(collectionMapped).toBeNull();
  });

  test('Should return a collection with id instead _id', () => {
    const collectionMapped = MongoHelper.map({
      _id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
    expect(collectionMapped).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
  });
});
