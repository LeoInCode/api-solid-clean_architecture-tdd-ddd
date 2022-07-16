/* eslint-disable no-underscore-dangle */
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';
import { AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols';
import { MongoHelper } from '../helpers/mongo-helper';
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository';
import { SurveyModel } from '../../../../domain/models/survey';

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository
{
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const surveys: any = await surveyCollection.find().toArray();
    return surveys.map((survey) => {
      return {
        ...survey,
        id: survey._id,
      };
    });
  }
}
