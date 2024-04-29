import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in";

let userRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  it("should be able to register", async () => {
    beforeEach(() => {
      userRepository = new InMemoryCheckInsRepository();
      sut = new CheckInUseCase(userRepository);
    });
  });

  it("should hash user password upon check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
