import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result';
import { SaveSurveyResultRepository } from '@/data/usecases/save-survey-result/db-save-survey-result-protocols';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = MongoHelper.getCollection('surveyResults');
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId,
      },
      {
        $set: {
          answer: data.answer,
          date: data.date,
        },
      },
      {
        upsert: true,
        returnDocument: 'after',
      },
    );
    if (res.value) {
      return MongoHelper.map(res.value);
    }
    const result = await surveyResultCollection.findOne({
      _id: res.lastErrorObject?.upserted,
    });

    return MongoHelper.map(result);
  }
}
