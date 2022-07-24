import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResulParams } from '@/domain/usecases/survey-result/save-survey-result';
import { SaveSurveyResultRepository } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols';
import { MongoHelper, QueryBuilder } from '../helpers';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResulParams): Promise<SurveyResultModel> {
    const surveyResultCollection = MongoHelper.getCollection('surveyResults');
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: MongoHelper.parseToObjectId(data.surveyId),
        accountId: MongoHelper.parseToObjectId(data.accountId),
      },
      {
        $set: {
          answer: data.answer,
          date: data.date,
        },
      },
      {
        upsert: true,
      },
    );
    const surveyResult = await this.loadBySurveyId(data.surveyId);
    return surveyResult;
  }

  private async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
    const surveyResultCollection = MongoHelper.getCollection('surveyResults');
    const query = new QueryBuilder()
      .match({
        surveyId: MongoHelper.parseToObjectId(surveyId),
      })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT',
        },
        count: {
          $sum: 1,
        },
      })
      .unwind({
        path: '$data',
      })
      .lookup({
        from: 'surveys',
        foreignField: '_id',
        localField: 'data.surveyId',
        as: 'survey',
      })
      .unwind({
        path: '$survey',
      })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: 'survey.date',
          total: '$count',
          answer: {
            $filter: {
              input: '$survey.answers',
              as: 'item',
              cond: {
                $eq: ['$$item.answer', '$data.answer'],
              },
            },
          },
        },
        count: {
          $sum: 1,
        },
      })
      .unwind({
        path: '$_id.answer',
      })
      .addFields({
        '_id.answer.count': '$count',
        '_id.answer.percent': {
          $multiply: [
            {
              $divide: ['$count', '$_id.total'],
            },
            100,
          ],
        },
      })
      .group({
        _id: {
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date',
        },
        answers: {
          $push: '$_id.answer',
        },
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers',
      })
      .build();

    const surveyResult = await surveyResultCollection
      .aggregate(query)
      .toArray();
    return surveyResult.length ? (surveyResult[0] as any) : null;
  }
}
