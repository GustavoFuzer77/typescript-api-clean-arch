import { SignInController } from "../../application/controllers/SignInController";
import { SignUpController } from "../../application/controllers/SignUpController";
import {
  FACTORY_SIGN_USER,
  SignUseCaseFactory,
} from "../useCases/makeSignUser";

export enum FACTORY_SIGN_USER_CONTROLLER {
  SIGN_IN = "SignIn",
  SIGN_UP = "SignUp",
}

interface IControllerFactory {
  handle(input: any): Promise<any>;
}

export class makeSignController {
  public static create(type: FACTORY_SIGN_USER_CONTROLLER): IControllerFactory {
    switch (type) {
      case FACTORY_SIGN_USER_CONTROLLER.SIGN_IN:
        const signInUseCase = SignUseCaseFactory.create(
          FACTORY_SIGN_USER.SIGN_IN
        );
        return new SignInController(signInUseCase);
      case FACTORY_SIGN_USER_CONTROLLER.SIGN_UP:
        const signUpUseCase = SignUseCaseFactory.create(
          FACTORY_SIGN_USER.SIGN_UP
        );
        return new SignUpController(signUpUseCase);
      default:
        throw new Error("Invalid controller factory type");
    }
  }
}
