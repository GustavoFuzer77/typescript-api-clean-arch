export interface HttpServer {
  get(path: string, handler: unknown): void;
  post(path: string, handler: unknown): void;
}
