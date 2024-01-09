import { GetUserMetricsService } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsService() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsService = new GetUserMetricsService(
    prismaCheckInsRepository,
  )

  return getUserMetricsService
}
