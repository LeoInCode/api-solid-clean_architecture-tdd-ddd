import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadSurveyById,
} from './save-survey-result-controller-protocols';

export class SaveSarveyResultController implements Controller {
  constructor(private readonly laodSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.laodSurveyById.loadById(httpRequest.params.surveyId);
    return null;
  }
}
