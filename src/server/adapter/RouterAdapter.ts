import type { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../../application/interfaces/IController";

// create a currying function/class that receives a controller and returns a function that returns the controller
export class RouterAdapter {
  public static handle(controller: IController) {
    return async (request: FastifyRequest, response: FastifyReply) => {
      const { body, statusCode } = await controller.handle({
        body: request.body,
        params: request.params,
        headers: request.headers,
      });

      response.status(statusCode).send(body);
    };
  }
}
