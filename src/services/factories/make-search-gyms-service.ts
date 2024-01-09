import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsService } from '../search-gyms'

export function makeSearchGymsService() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsService = new SearchGymsService(prismaGymsRepository)

  return searchGymsService
}
