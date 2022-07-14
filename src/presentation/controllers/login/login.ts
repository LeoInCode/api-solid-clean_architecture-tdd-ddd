import {
  serverError,
  badRequest,
  unauthorized,
  ok,
} from '../../helpers/http-helper';
import { InvalidParamError, MissingParamError } from '../../errors';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Authentication,
  Validation,
} from './login-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly authentication: Authentication;

  private readonly validation: Validation;

  constructor(
    emailValidator: EmailValidator,
    authentication: Authentication,
    validation: Validation,
  ) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('password'));
      }

      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }

      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
