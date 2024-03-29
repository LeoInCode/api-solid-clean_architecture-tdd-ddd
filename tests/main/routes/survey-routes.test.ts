import request from 'supertest';
import { Collection } from 'mongodb';
import jwt from 'jsonwebtoken';
import { Express } from 'express';
import { MongoHelper } from '@/infra/db';
import { setupApp } from '@/main/config/app';
import env from '@/main/config/env';

let surveyCollection: Collection;
let accountCollection: Collection;
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

describe('Survey Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              image: 'http://image-name.com',
              answer: 'Answer 1',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(403);
    });

    test('Should return 204 on add survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              image: 'http://image-name.com',
              answer: 'Answer 1',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('Should return 403 on load survey without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403);
    });

    test('Should return 200 on load survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      await surveyCollection.insertMany([
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
      ]);
      await request(app).get('/api/surveys').set('x-access-token', accessToken).expect(200);
    });
  });
});
