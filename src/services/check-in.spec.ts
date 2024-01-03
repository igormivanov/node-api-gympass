import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'

let checkIn: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkIn = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkIn)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
