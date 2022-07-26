import { Collection } from 'mongodb';
import { SurveyModel } from '@/domain/models/survey';
import { AccountModel } from '@/domain/models/account';
import { mockAddAccountParams } from '@/domain/test';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer_1',
      },
      {
        answer: 'other_answer_2',
      },
      {
        answer: 'other_answer_3',
      },
    ],
    date: new Date(),
  });
  const survey = await surveyCollection.findOne({ _id: res.insertedId });
  return MongoHelper.map(survey);
};

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  const account = await accountCollection.findOne({ _id: res.insertedId });
  return MongoHelper.map(account);
};

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

describe('Survey Reuult Mongo Repository', () => {
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

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut();
      const survey = await mockSurvey();
      const account = await mockAccount();
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id),
      });
      expect(surveyResult).toBeTruthy();
    });

    test('Should update survey result if its not new', async () => {
      const sut = makeSut();
      const survey = await mockSurvey();
      const account = await mockAccount();
      await surveyResultCollection.insertOne({
        surveyId: MongoHelper.parseToObjectId(survey.id),
        accountId: MongoHelper.parseToObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date(),
      });
      const surveyResult = await surveyResultCollection
        .find({
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(account.id),
        })
        .toArray();
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.length).toBe(1);
    });
  });

  describe('loadBySurveyId', () => {
    test('Should update survey result if its not new', async () => {
      const sut = makeSut();
      const survey = await mockSurvey();
      const account = await mockAccount();
      await surveyResultCollection.insertMany([
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(account.id),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(account.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
        {
          surveyId: MongoHelper.parseToObjectId(survey.id),
          accountId: MongoHelper.parseToObjectId(account.id),
          answer: survey.answers[1].answer,
          date: new Date(),
        },
      ]);
      const surveyResult = await sut.loadBySurveyId(survey.id);
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(2);
      expect(surveyResult.answers[0].percent).toBe(50);
      expect(surveyResult.answers[1].count).toBe(2);
      expect(surveyResult.answers[1].percent).toBe(50);
      expect(surveyResult.answers[2].count).toBe(0);
      expect(surveyResult.answers[2].percent).toBe(0);
    });
  });
});
