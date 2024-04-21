import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-alreadt-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  const registerUseCase = makeRegisterUseCase();
  try {
    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send({ message: "Usuário criado com sucesso." });
}
