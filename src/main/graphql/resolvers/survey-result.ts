import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories/controllers';
import { adaptResolver } from '@/main/adapters';

export default {
  Query: {
    surveyResult: async (parent: any, args: any) => adaptResolver(makeLoadSurveyResultController(), args),
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any) => adaptResolver(makeSaveSurveyResultController(), args),
  },
};
