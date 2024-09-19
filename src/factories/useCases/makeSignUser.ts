interface IUseCaseFactory {
  execute(input: any): Promise<any>;
}

import { SignIn } from "../../application/useCases/SignInUseCase";
import { SignUp } from "../../application/useCases/SignUpUseCase";

export enum FACTORY_SIGN_USER {
  SIGN_IN = "SignIn",
  SIGN_UP = "SignUp",
}

export class SignUseCaseFactory {
  public static create(type: FACTORY_SIGN_USER): IUseCaseFactory {
    switch (type) {
      case FACTORY_SIGN_USER.SIGN_IN:
        // adding a new calleds methods and injecting dependencies
        return new SignIn();
      case FACTORY_SIGN_USER.SIGN_UP:
        // adding a new calleds methods and injecting dependencies
        return new SignUp();
      default:
        throw new Error("Invalid use case type");
    }
  }
}
