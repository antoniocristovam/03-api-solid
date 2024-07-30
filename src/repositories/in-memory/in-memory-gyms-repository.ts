import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gyms-repository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);
    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title,
      descrition: data.descrition ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };
    this.items.push(gym);
    return gym;
  }
}
