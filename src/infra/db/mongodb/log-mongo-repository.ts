import { MongoHelper } from '@/infra/db';
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack,
      data: new Date(),
    });
  }
}
