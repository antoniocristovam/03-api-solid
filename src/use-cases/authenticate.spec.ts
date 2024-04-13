import { hash } from "bcryptjs";
import { expect, describe, it } from "vitest";
import { AuthenticationUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Authentication Use Case", () => {
  it("should be able to authentication", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticationUseCase(userRepository);

    await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authentication wrong email ", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticationUseCase(userRepository);

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authentication wrong password ", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticationUseCase(userRepository);

    await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
