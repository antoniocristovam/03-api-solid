import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in";

let userRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  it("should be able to register", async () => {
    beforeEach(() => {
      userRepository = new InMemoryCheckInsRepository();
      sut = new CheckInUseCase(userRepository);
      vi.useFakeTimers();
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should hash user password upon check in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice but in different days.", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
