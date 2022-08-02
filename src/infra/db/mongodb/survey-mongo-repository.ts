/* eslint-disable no-underscore-dangle */
import { QueryBuilder } from './query-builder';
import { AddSurveyParams } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { MongoHelper } from '@/infra/db';
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/load-survey-by-id-protocols';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result',
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: '$result',
                  as: 'item',
                  cond: {
                    $eq: [
                      '$$item.accountId',
                      MongoHelper.parseToObjectId(accountId),
                    ],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const objectId = MongoHelper.parseToObjectId(id);
    const survey = await surveyCollection.findOne({ _id: objectId });
    return MongoHelper.map(survey);
  }
}
