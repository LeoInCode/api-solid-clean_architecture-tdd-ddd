import { Router } from 'express';
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories/controllers';
import { adaptRoute } from '@/main/adapters';
import { adminAuth, auth } from '@/main/middlewares';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()));
};
