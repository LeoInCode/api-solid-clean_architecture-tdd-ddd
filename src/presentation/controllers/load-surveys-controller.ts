import { noContent, ok, serverError } from '@/presentation/helpers/http-helper';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadSurveys,
} from './survey/load-surveys/load-survey-controller-protocols';

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId);
      if (surveys.length === 0) {
        return noContent();
      }
      return ok(surveys);
    } catch (error) {
      return serverError(error);
    }
  }
}
