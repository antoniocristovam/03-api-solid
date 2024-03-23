import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { registerUseCase } from "@/use-cases/register";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase({ email, name, password });
  } catch (error) {
    return reply.status(400).send();
  }

  return reply.status(201).send({ message: "Usuário criado com sucesso." });
}
