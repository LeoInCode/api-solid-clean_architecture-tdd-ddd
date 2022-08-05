import { Controller, Validation, HttpResponse } from '@/presentation/protocols';
import { serverError, badRequest, unauthorized, ok } from '@/presentation/helpers';
import { Authentication } from '@/domain/usecases';

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication, private readonly validation: Validation) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }

      const { email, password } = request;
      const authenticationResult = await this.authentication.auth({
        email,
        password,
      });
      if (!authenticationResult) {
        return unauthorized();
      }

      return ok(authenticationResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}
