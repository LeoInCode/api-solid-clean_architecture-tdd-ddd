import jwt from 'jsonwebtoken';
import request from 'supertest';
import { Collection } from 'mongodb';
import { hash } from 'bcrypt';
import { Express } from 'express';
import env from '@/main/config/env';
import { setupApp } from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let accountCollection: Collection;
let app: Express;
let surveyCollection: Collection;

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

describe('Survey GraphQL', () => {
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

  describe('Surveys Query', () => {
    const query = `query {
      surveys {
        id
        question
        answers {
          image
          answer
        }
        date
        didAnswer
      }
    }`;

    test('Should return Surveys', async () => {
      const accessToken = await makeAccessToken();
      const now = new Date();
      await surveyCollection.insertOne({
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
      const res = await request(app).post('/graphql').set('x-access-token', accessToken).send({ query });
      expect(res.status).toBe(200);
      expect(res.body.data.surveys.length).toBe(1);
      expect(res.body.data.surveys[0].id).toBeTruthy();
      expect(res.body.data.surveys[0].question).toBe('Question');
      expect(res.body.data.surveys[0].date).toBe(now.toISOString());
      expect(res.body.data.surveys[0].didAnswer).toBe(false);
      expect(res.body.data.surveys[0].answers).toEqual([
        {
          answer: 'Answer 1',
          image: 'http://image-name.com',
        },
        {
          answer: 'Answer 2',
          image: null,
        },
      ]);
    });

    test('Should return AccessDeniedError if no token is provided', async () => {
      const now = new Date();
      await surveyCollection.insertOne({
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
      const res = await request(app).post('/graphql').send({ query });
      expect(res.status).toBe(403);
      expect(res.body.data).toBeFalsy();
      expect(res.body.errors[0].message).toBe('Access denied');
    });
  });
});
