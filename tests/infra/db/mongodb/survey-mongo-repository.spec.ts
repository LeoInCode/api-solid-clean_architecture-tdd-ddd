import { Collection } from 'mongodb';
import FakeObjectId from 'bson-objectid';
import { SurveyMongoRepository, MongoHelper } from '@/infra/db';
import { mockAddAccountParams, mockSurveysParams } from '@/tests/domain/mocks';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return res.insertedId.toHexString();
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
      const accountId = await mockAccountId();
      const surveysParams = mockSurveysParams();
      const result = await surveyCollection.insertMany(surveysParams);
      const survey = await surveyCollection.findOne({
        _id: result.insertedIds[0],
      });
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: MongoHelper.parseToObjectId(accountId),
        answer: surveysParams[0].answers[0].answer,
        date: new Date(),
      });
      const sut = makeSut();
      const surveys = await sut.loadAll(accountId);
      expect(surveys).toBeInstanceOf(Array);
      expect(surveys.length).toBe(2);
      expect(surveys[0].id).toBeTruthy();
      expect(surveys[0].question).toBe(surveysParams[0].question);
      expect(surveys[0].didAnswer).toBe(true);
      expect(surveys[1].question).toBe(surveysParams[1].question);
      expect(surveys[1].didAnswer).toBe(false);
    });

    test('Should load empty list', async () => {
      const accountId = await mockAccountId();
      const sut = makeSut();
      const surveys = await sut.loadAll(accountId);
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

  describe('checkById()', () => {
    test('Should return true if survey exists', async () => {
      const sut = makeSut();
      const surveys = mockSurveysParams();
      const res = await surveyCollection.insertOne(surveys[0]);
      const survey = await sut.checkById(res.insertedId.toHexString());
      expect(survey).toBe(true);
    });

    test('Should return false if survey exists', async () => {
      const sut = makeSut();
      const survey = await sut.checkById(new FakeObjectId().toHexString());
      expect(survey).toBe(false);
    });
  });
});
