import fastify from "fastify";

import { FastifyAdapter } from "../application/adapter/FastfyAdapter";
import { SignIn } from "../application/useCases/SignInUseCase";
import { SignInController } from "../application/controllers/SignInController";
import { SignUp } from "../application/useCases/SignUpUseCase";
import { SignUpController } from "../application/controllers/SignUpController";
import {
  FACTORY_SIGN_USER,
  SignUseCaseFactory,
} from "../factories/useCases/makeSignUser";
import {
  FACTORY_SIGN_USER_CONTROLLER,
  makeSignController,
} from "../factories/controllers/makeSignController";

class Server {
  private readonly libServer = fastify();
  // private readonly libServer = express();
  // private readonly libServer = dfhsdhfdf();

  start() {
    const httpServer = new FastifyAdapter(this.libServer);
    // const httpServer = new ExpressAdapter(this.libServer);
    // const httpServer = new HapiAdapter(this.libServer);

    httpServer.post("/sign-in", async (request, response) => {
      const signInUseCase = SignUseCaseFactory.create(
        FACTORY_SIGN_USER.SIGN_IN
      );
      const signInController = makeSignController.create(
        FACTORY_SIGN_USER_CONTROLLER.SIGN_IN
      );

      signInController.handle(signInUseCase);

      const { body, statusCode } = await signInController.handle({
        body: request.body,
      });

      response.status(statusCode).send(body);
    });

    httpServer.post("/sign-up", async (request, response) => {
      const signUpUseCase = SignUseCaseFactory.create(
        FACTORY_SIGN_USER.SIGN_UP
      );
      
      const signUpController = makeSignController.create(
        FACTORY_SIGN_USER_CONTROLLER.SIGN_UP
      );
      signUpController.handle(signUpUseCase);

      const { body, statusCode } = await signUpController.handle({
        body: request.body,
      });

      response.status(statusCode).send(body);
    });
  }
}

const server = new Server();
server.start();
