import { InvalidParamError } from '@/presentation/errors';
import {
  forbidden,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadSurveyById,
} from './save-survey-result-controller-protocols';

export class SaveSarveyResultController implements Controller {
  constructor(private readonly laodSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.laodSurveyById.loadById(
        httpRequest.params.surveyId,
      );
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
