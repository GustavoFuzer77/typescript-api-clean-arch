import type { PrismaClient } from "@prisma/client";
import { ICrudInterface } from "../interfaces/CrudRepository";

type SqlAddon = {
  id: string;
  createdAt: Date;
  deletedAt: Date;
};

export class PrismaRepository<T extends object>
  implements ICrudInterface<T & SqlAddon>
{
  private prisma: PrismaClient;
  private model: any;

  constructor(prisma: PrismaClient, model: any) {
    this.prisma = prisma;
    this.model = model;
  }

  async findByEmail(email: string): Promise<(T & SqlAddon) | null> {
    return this.prisma.$transaction(async (prisma) => {
      return this.model.findUnique({
        where: { email },
      });
    });
  }

  async create(data: T): Promise<T & SqlAddon> {
    return this.prisma.$transaction(async (prisma) => {
      return this.model.create({
        data,
      });
    });
  }
}
