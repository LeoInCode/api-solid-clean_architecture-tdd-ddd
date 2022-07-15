import {
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-survey-controller-protocols';
import { Controller } from '../../../protocols/controller';

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body);
    return new Promise((resolve) => resolve(null));
  }
}
