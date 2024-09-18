import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpServer } from "../interfaces/HttpRepository";

export class FastifyAdapter implements HttpServer {
  
  constructor(private readonly server: FastifyInstance) {
    server.listen({ port: 3001 }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  }

  get(
    path: string,
    handler: (request: FastifyRequest, reply: FastifyReply) => void
  ) {
    this.server.get(path, handler);
  }

  post(
    path: string,
    handler: (request: FastifyRequest, reply: FastifyReply) => void
  ) {
    this.server.post(path, handler);
  }
}
