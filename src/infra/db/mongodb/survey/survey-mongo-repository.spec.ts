import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { mockSurveysParams } from '@/domain/test';

let surveyCollection: Collection;

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut();
      const fakeSurvey = mockSurveysParams();
      await sut.add(fakeSurvey[0]);
      const survey = await surveyCollection.findOne({
        question: 'any_question',
      });
      expect(survey).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    test('Should load all surveys on succes', async () => {
      const sut = makeSut();
      await surveyCollection.insertMany(mockSurveysParams());
      const surveys = await sut.loadAll();
      expect(surveys).toBeInstanceOf(Array);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe('any_question');
      expect(surveys[1].question).toBe('other_question');
    });

    test('Should load empty list', async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll();
      expect(surveys).toBeInstanceOf(Array);
      expect(surveys.length).toBe(0);
    });
  });

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const sut = makeSut();
      const surveys = mockSurveysParams();
      const res = await surveyCollection.insertOne(surveys[0]);
      const survey = await sut.loadById(res.insertedId.toHexString());
      expect(survey).toBeTruthy();
    });
  });
});
