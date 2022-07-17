import { Collection } from 'mongodb';
import { AddSurveyModel } from '@/domain/usecases/add-survey';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';

let surveyCollection: Collection;

const makeFakeSurveys = (): AddSurveyModel[] => [
  {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  },
  {
    question: 'other_question',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer',
      },
    ],
    date: new Date(),
  },
];

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository();
};

describe('Account Mongo Repository', () => {
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
      const fakeSurvey = makeFakeSurveys();
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
      await surveyCollection.insertMany(makeFakeSurveys());
      const surveys = await sut.loadAll();
      expect(surveys).toBeInstanceOf(Array);
      expect(surveys.length).toBe(2);
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
});
