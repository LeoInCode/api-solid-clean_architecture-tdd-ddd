/* eslint-disable no-underscore-dangle */
import { Collection } from 'mongodb';
import { AccountModel } from '@/domain/models';
import { SurveyMongoRepository, MongoHelper } from '@/infra/db';
import { mockAddAccountParams, mockSurveysParams } from '@/tests/domain/mocks';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  const account = await accountCollection.findOne({ _id: res.insertedId });
  return MongoHelper.map(account);
};

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
    surveyResultCollection = MongoHelper.getCollection('surveyResults');
    await surveyCollection.deleteMany({});
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
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
      const account = await mockAccount();
      const surveysParams = mockSurveysParams();
      const result = await surveyCollection.insertMany(surveysParams);
      const survey = await surveyCollection.findOne({
        _id: result.insertedIds[0],
      });
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: account.id,
        answer: surveysParams[0].answers[0].answer,
      });
      const sut = makeSut();
      const surveys = await sut.loadAll(account.id);
      expect(surveys).toBeInstanceOf(Array);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe(surveysParams[0].question);
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].question).toBe(surveysParams[1].question);
      expect(surveys[1].didAnswer).toBe(false);
    });

    test('Should load empty list', async () => {
      const account = await mockAccount();
      const sut = makeSut();
      const surveys = await sut.loadAll(account.id);
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
