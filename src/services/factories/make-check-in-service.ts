import { CheckInService } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const checkInService = new CheckInService(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return checkInService
}
