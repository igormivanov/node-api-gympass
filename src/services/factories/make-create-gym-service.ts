import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymService } from '../create-gym'

export function makeValidateCheckInService() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymService = new CreateGymService(prismaGymsRepository)

  return createGymService
}
