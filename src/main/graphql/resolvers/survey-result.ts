import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories/controllers';
import { adaptResolver } from '@/main/adapters';

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) =>
      adaptResolver(makeLoadSurveyResultController(), args, context),
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) =>
      adaptResolver(makeSaveSurveyResultController(), args, context),
  },
};
