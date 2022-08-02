import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository';
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result';
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result-mongo-repository';
import { DbLoadSurveyResult } from '@/data/usecases/db-load-survey-result';

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository,
  );
};
