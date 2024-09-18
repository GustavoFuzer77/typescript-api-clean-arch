import { IController, IRequest, IResponse } from "../interfaces/IController";
import { z, ZodError } from "zod";
import type { SignUp } from "../useCases/SignUpUseCase";
import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUp) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, name, password } = schema.parse(body);

      await this.signUpUseCase.execute({ email, name, password });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          body: e.issues,
          statusCode: 400,
        };
      }

      if (e instanceof AlreadyExistsException) {
        return {
          body: {
            error: e.message,
          },
          statusCode: 409,
        };
      }

      throw e;
    }
  }
}
