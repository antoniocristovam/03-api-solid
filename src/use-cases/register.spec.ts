import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alreadt-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    const isPasswordCorrectHashed = await compare("123456", user.password_hash);
    expect(isPasswordCorrectHashed).toBe(true);
  });
});

it("should not be able to register with same email twice", async () => {
  const userRepository = new InMemoryUsersRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  const email = "johndoe@example.com";

  await registerUseCase.execute({
    name: "John Doe",
    email: email,
    password: "123456",
  });

  await expect(() =>
    registerUseCase.execute({
      name: "John Doe",
      email: email,
      password: "123456",
    })
  ).rejects.toBeInstanceOf(UserAlreadyExistsError);
});
