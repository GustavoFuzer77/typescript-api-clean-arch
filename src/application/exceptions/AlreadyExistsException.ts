export class AlreadyExistsException extends Error {
  name: string;
  type: string;

  constructor(type: string, message?: string) {
    super(message || `${type} already exists`);
    this.name = "AlreadyExistsException";
    this.type = type;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyExistsException);
    }
  }
}
