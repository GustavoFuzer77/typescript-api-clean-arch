import { InvalidCredentialException } from "../exceptions/InvalidCredentialException";
import { prisma } from "../lib/PrismaClient";
import { PrismaRepository } from "../repositories/PrismaRepository";
import { sign } from "jsonwebtoken";

import { compare, hash } from "bcryptjs";
import { env } from "../config/envLoader";

interface IInputParams {
  email: string;
  password: string;
}

interface IOutputParams {
  accessToken: String;
}

export class SignIn {
  async execute({ email, password }: IInputParams): Promise<IOutputParams> {
    const accountRepository = new PrismaRepository<IInputParams>(
      prisma,
      prisma.account
    );

    const account = await accountRepository.findByEmail(email);

    if (!account) {
      throw new InvalidCredentialException(
        "Credential",
        "error, email or password are invalid"
      );
    }

    const hashedPasswordCompare = await compare(password, account.password);

    if (!hashedPasswordCompare) {
      throw new InvalidCredentialException(
        "Credential",
        "error, email or password are invalid"
      );
    }

    const accessToken = sign(
      {
        subject: account.id,
      },
      env.jwtSecret,
      {
        expiresIn: "12h",
      }
    );

    return {
      accessToken,
    };
  }
}
