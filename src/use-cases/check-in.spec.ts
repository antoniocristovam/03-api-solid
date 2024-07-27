import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let userRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;
let gymRepository: InMemoryGymsRepository;

describe("Check-in Use Case", () => {
  it("should be able to register", async () => {
    beforeEach(() => {
      userRepository = new InMemoryCheckInsRepository();
      gymRepository = new InMemoryGymsRepository();
      sut = new CheckInUseCase(userRepository, gymRepository);

      gymRepository.items.push({
        id: "gym-01",
        title: "Academia 01",
        latitude: new Decimal(0),
        longitude: new Decimal(0),
        descrition: "Academia 01",
        phone: "123456789",
      });

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
      userLatitude: 0,
      userLongitude: 0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice but in different days.", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
