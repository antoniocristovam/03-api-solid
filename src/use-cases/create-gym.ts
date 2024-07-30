import { Gym, User } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";

interface CreateGymUseCaseRequest {
  title: string;
  descrition: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    descrition,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      phone,
      title,
      descrition,
    });
    return {
      gym,
    };
  }
}
