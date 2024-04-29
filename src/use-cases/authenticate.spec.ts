import { hash } from "bcryptjs";
import { AuthenticationUseCase } from "./authenticate";
import { expect, describe, it, beforeEach } from "vitest";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let userRepository: InMemoryUsersRepository;
let sut: AuthenticationUseCase;

describe("Authentication Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new AuthenticationUseCase(userRepository);
  });

  it("should be able to authentication", async () => {
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
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authentication wrong password ", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
