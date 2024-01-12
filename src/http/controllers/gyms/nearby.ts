import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymsQuerySchema.parse(
    request.query,
  )

  const fetchNearbyGymService = makeFetchNearbyGymsService()

  const { gyms } = await fetchNearbyGymService.execute({
    userLatitude,
    userLongitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
