export interface IRequest {
  body: Record<string, any> | unknown;
  params: Record<string, any> | unknown;
  headers: Record<string, any> | unknown;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
