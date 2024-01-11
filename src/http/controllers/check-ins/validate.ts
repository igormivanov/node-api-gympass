import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamSchema.parse(request.params)

  const validateCheckInService = makeValidateCheckInService()

  await validateCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
