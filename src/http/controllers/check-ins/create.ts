import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInService } from '@/services/factories/make-check-in-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )

  const { gymId } = createCheckInParamsSchema.parse(request.query)

  const checkInService = makeCheckInService()

  await checkInService.execute({
    gymId,
    userId: request.user.sub,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
