import { IController, IRequest, IResponse } from "../interfaces/IController";
import { z, ZodError } from "zod";
import type { SignIn } from "../useCases/SignInUseCase";
import { InvalidCredentialException } from "../exceptions/InvalidCredentialException";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignIn) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });

      return {
        statusCode: 200,
        body: accessToken,
      };
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          body: e.issues,
          statusCode: 400,
        };
      }

      if (e instanceof InvalidCredentialException) {
        return {
          body: {
            error: e.message,
          },
          statusCode: 401,
        };
      }

      throw e;
    }
  }
}
