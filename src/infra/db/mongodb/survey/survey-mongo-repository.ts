/* eslint-disable no-underscore-dangle */
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';
import { SurveyModel } from '@/domain/models/survey';
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { MongoHelper } from '../helpers/mongo-helper';
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

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const surveys: any = await surveyCollection.find().toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = MongoHelper.getCollection('surveys');
    const objectId = MongoHelper.parseToObjectId(id);
    const survey = await surveyCollection.findOne({ _id: objectId });
    return MongoHelper.map(survey);
  }
}
