import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create gym useCase", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript",
      latitude: -27.2092052,
      longitude: -49.6401091,
      descrition: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
