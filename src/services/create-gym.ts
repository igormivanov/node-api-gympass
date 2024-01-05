import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceRequest {
  description: string | null
  title: string
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    title,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      description,
      title,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
