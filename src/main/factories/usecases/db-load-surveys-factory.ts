import { LoadSurveys } from '@/domain/usecases';
import { DbLoadSurveys } from '@/data/usecases/db-load-surveys';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository';

export const makeDbLoadSurvey = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
