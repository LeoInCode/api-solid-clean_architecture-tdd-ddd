import jwt from 'jsonwebtoken';
import request from 'supertest';
import { Collection } from 'mongodb';
import { Express } from 'express';
import env from '@/main/config/env';
import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let accountCollection: Collection;
let surveyCollection: Collection;
let app: Express;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Leo',
    email: 'leo@mail.com',
    password: '123',
    role: 'admin',
  });
  const accessToken = await jwt.sign({ id: res.insertedId.toHexString() }, env.jwtSecret);
  await accountCollection.updateOne(
    { _id: res.insertedId },
    {
      $set: {
        accessToken,
      },
    },
  );
  return accessToken;
};

describe('Survey Result GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
    surveyCollection = MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
  });

  describe('SurveyResult Query', () => {
    test('Should return SurveyResult', async () => {
      const accessToken = await makeAccessToken();
      const now = new Date();
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: now,
      });
      const query = `query {
        surveyResult (surveyId: "${surveyRes.insertedId.toHexString()}") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`;
      const res = await request(app).post('/graphql').set('x-access-token', accessToken).send({ query });
      expect(res.status).toBe(200);
      expect(res.body.data.surveyResult.question).toBe('Question');
      expect(res.body.data.surveyResult.date).toBe(now.toISOString());
      expect(res.body.data.surveyResult.answers).toEqual([
        {
          answer: 'Answer 1',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false,
        },
        {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false,
        },
      ]);
    });

    test('Should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });
      const query = `query {
        surveyResult (surveyId: "${surveyRes.insertedId.toHexString()}") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }`;
      const res = await request(app).post('/graphql').send({ query });
      expect(res.status).toBe(403);
      expect(res.body.data).toBeFalsy();
      expect(res.body.errors[0].message).toBe('Access denied');
    });
  });

  describe('SaveSurveyResult Mutation', () => {
    test('Should return SurveyResult', async () => {
      const accessToken = await makeAccessToken();
      const now = new Date();
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: now,
      });
      const query = `mutation {
        saveSurveyResult (surveyId: "${surveyRes.insertedId.toHexString()}", answer: "Answer 1") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
        }
      }`;
      const res = await request(app).post('/graphql').set('x-access-token', accessToken).send({ query });
      expect(res.status).toBe(200);
      expect(res.body.data.saveSurveyResult.question).toBe('Question');
      expect(res.body.data.saveSurveyResult.answers).toEqual([
        {
          answer: 'Answer 1',
          count: 1,
          percent: 100,
          isCurrentAccountAnswer: true,
        },
        {
          answer: 'Answer 2',
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false,
        },
      ]);
    });

    test('Should return AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [
          {
            answer: 'Answer 1',
            image: 'http://image-name.com',
          },
          {
            answer: 'Answer 2',
          },
        ],
        date: new Date(),
      });
      const query = `mutation {
        saveSurveyResult (surveyId: "${surveyRes.insertedId.toHexString()}", answer: "Answer 1") {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
        }
      }`;
      const res = await request(app).post('/graphql').send({ query });
      expect(res.status).toBe(403);
      expect(res.body.data).toBeFalsy();
      expect(res.body.errors[0].message).toBe('Access denied');
    });
  });
});
