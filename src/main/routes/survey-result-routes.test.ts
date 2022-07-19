import jwt from 'jsonwebtoken';
import request from 'supertest';
import { Collection } from 'mongodb';
import env from '@/main/config/env';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import app from '@/main/config/app';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Leo',
    email: 'leo@mail.com',
    password: '123',
    role: 'admin',
  });
  const accessToken = await jwt.sign(
    { id: res.insertedId.toHexString() },
    env.jwtSecret,
  );
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

describe('Survey Results Routes', () => {
  beforeAll(async () => {
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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    test('Should return 200 on save survey with valid accessToken', async () => {
      const accessToken = await makeAccessToken();
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      });
      await request(app)
        .put(`/api/surveys/${res.insertedId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer',
        })
        .expect(200);
    });
  });
});
