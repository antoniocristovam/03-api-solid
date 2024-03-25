import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6);

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithEmail) {
    throw new Error("Email já cadastrado.");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
