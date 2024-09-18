import fastify from "fastify";

import { FastifyAdapter } from "../application/adapter/FastfyAdapter";
import { SignIn } from "../application/useCases/SignInUseCase";
import { SignInController } from "../application/controllers/SignInController";
import { SignUp } from "../application/useCases/SignUpUseCase";
import { SignUpController } from "../application/controllers/SignUpController";

class Server {
  private readonly libServer = fastify();
  // private readonly libServer = express();
  // private readonly libServer = dfhsdhfdf();

  start() {
    const httpServer = new FastifyAdapter(this.libServer);
    // const httpServer = new ExpressAdapter(this.libServer);
    // const httpServer = new HapiAdapter(this.libServer);

    httpServer.post("/signIn", async (request, response) => {
      const signInUseCase = new SignIn();
      const signInController = new SignInController(signInUseCase);

      signInController.handle({
        body: request.body,
      });
    });

    httpServer.post("/signUp", async (request, response) => {
      const signUpUseCase = new SignUp();
      const signUpController = new SignUpController(signUpUseCase);

      signUpController.handle({
        body: request.body,
      });
    });
  }
}

const server = new Server();
server.start();
