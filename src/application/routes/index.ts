// src/application/routes.ts
import { HttpServer } from "../interfaces/HttpRepository";
import { SignInController } from "../controllers/SignInController";
import { SignIn } from "../useCases/SignInUseCase";

export function buildRoutes(httpServer: HttpServer) {

  const signInUseCase = new SignIn();
  const signInController = new SignInController(signInUseCase);

  httpServer.post("/signIn", async (request, reply) => {
    const response = await signInController.handle({
      body: request.body,
    });
    reply.status(response.statusCode).send(response.body);
  });

  httpServer.post("/signUp", async (request, reply) => {
    reply.status(200).send({ message: "Up" });
  });
}
