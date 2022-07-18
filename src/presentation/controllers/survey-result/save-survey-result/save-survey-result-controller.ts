import { InvalidParamError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers/http/http-helper';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadSurveyById,
} from './save-survey-result-controller-protocols';

export class SaveSarveyResultController implements Controller {
  constructor(private readonly laodSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.laodSurveyById.loadById(
      httpRequest.params.surveyId,
    );
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'));
    }
    return null;
  }
}
