import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { expect, describe, it, beforeEach } from "vitest";
import { UserAlreadyExistsError } from "./errors/user-alreadt-exists-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let userRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    beforeEach(() => {
      userRepository = new InMemoryUsersRepository();
      sut = new RegisterUseCase(userRepository);
    });

    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    const isPasswordCorrectHashed = await compare("123456", user.password_hash);
    expect(isPasswordCorrectHashed).toBe(true);
  });
});

it("should not be able to register with same email twice", async () => {
  const email = "johndoe@example.com";

  await sut.execute({
    name: "John Doe",
    email: email,
    password: "123456",
  });

  await expect(() =>
    sut.execute({
      name: "John Doe",
      email: email,
      password: "123456",
    })
  ).rejects.toBeInstanceOf(UserAlreadyExistsError);
});
