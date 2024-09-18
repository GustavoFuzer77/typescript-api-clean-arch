import { AlreadyExistsException } from "../exceptions/AlreadyExistsException";
import { prisma } from "../lib/PrismaClient";
import { PrismaRepository } from "../repositories/PrismaRepository";

import { hash } from "bcryptjs";

interface IInputParams {
  name: string;
  email: string;
  password: string;
}

type IOutputParams = void;

export class SignUp {
  async execute({
    email,
    name,
    password,
  }: IInputParams): Promise<IOutputParams> {
    const accountRepository = new PrismaRepository<IInputParams>(
      prisma,
      prisma.account
    );

    const emailAlreadyExists = await accountRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AlreadyExistsException(
        "Accounts - email",
        "User with this email already exists"
      );
    }

    const hashedPassword = await hash(password, 12);

    await accountRepository.create({
      email,
      password: hashedPassword,
      name,
    } as IInputParams);
  }
}
