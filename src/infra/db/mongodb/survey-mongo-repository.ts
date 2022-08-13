import {
  LoadSurveysRepository,
  LoadSurveyByIdRepository,
  AddSurveyRepository,
  CheckSurveyByIdRepository,
  LoadAnswersBySurveyRepository,
} from '@/data/protocols';
import { SurveyModel } from '@/domain/models';
import { MongoHelper, QueryBuilder } from '@/infra/db';

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository,
    CheckSurveyByIdRepository,
    LoadAnswersBySurveyRepository
{
  async add(surveyData: AddSurveyRepository.Params): Promise<void> {
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
                    $eq: ['$$item.accountId', MongoHelper.parseToObjectId(accountId)],
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

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const objectId = MongoHelper.parseToObjectId(id);
    const survey = await surveyCollection.findOne({ _id: objectId });
    return MongoHelper.map(survey);
  }

  async loadAnswers(id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const objectId = MongoHelper.parseToObjectId(id);
    const query = new QueryBuilder()
      .match({
        _id: objectId,
      })
      .project({
        _id: 0,
        answers: '$answers.answer',
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return surveys[0]?.answers || [];
  }

  async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const objectId = MongoHelper.parseToObjectId(id);
    const survey = await surveyCollection.findOne(
      { _id: objectId },
      {
        projection: {
          _id: 1,
        },
      },
    );
    return survey !== null;
  }
}
