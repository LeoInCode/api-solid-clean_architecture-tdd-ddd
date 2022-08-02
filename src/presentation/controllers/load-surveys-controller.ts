import { noContent, ok, serverError } from '@/presentation/helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { LoadSurveys } from '@/domain/usecases';

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
