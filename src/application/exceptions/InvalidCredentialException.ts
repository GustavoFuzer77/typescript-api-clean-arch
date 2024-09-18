export class InvalidCredentialException extends Error {
  name: string;
  type: string;

  constructor(type: string, message?: string) {
    super(message || `${type} - invalid credentials`);
    this.name = "InvalidCredentialException";
    this.type = type;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidCredentialException);
    }
  }
}
