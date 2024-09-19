import fastify from "fastify";

import { FastifyAdapter } from "./adapter/FastfyAdapter";
import {
  FACTORY_SIGN_USER,
  SignUseCaseFactory,
} from "../factories/useCases/makeSignUser";
import {
  FACTORY_SIGN_USER_CONTROLLER,
  makeSignController,
} from "../factories/controllers/makeSignController";
import { RouterAdapter } from "./adapter/RouterAdapter";

class Server {
  private readonly libServer = fastify();
  // private readonly libServer = express();
  // private readonly libServer = qualquer();

  start() {
    const httpServer = new FastifyAdapter(this.libServer);
    // const httpServer = new ExpressAdapter(this.libServer);
    // const httpServer = new HapiAdapter(this.libServer);

    httpServer.post(
      "/sign-in",
      RouterAdapter.handle(
        makeSignController.create(FACTORY_SIGN_USER_CONTROLLER.SIGN_IN)
      )
    );

    httpServer.post(
      "/sign-up",
      RouterAdapter.handle(
        makeSignController.create(FACTORY_SIGN_USER_CONTROLLER.SIGN_UP)
      )
    );
  }
}

const server = new Server();
server.start();
