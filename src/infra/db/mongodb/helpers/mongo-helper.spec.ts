import { MongoHelper } from './mongo-helper';

describe('Mongo Helper', () => {
  test('Should return null on map if a collection was null', () => {
    const collectionMapped = MongoHelper.map(null);
    expect(collectionMapped).toBeNull();
  });
});
