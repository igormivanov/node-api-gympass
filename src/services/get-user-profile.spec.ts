import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'igor id',
      email: 'igorauthenticate@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('igor id')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
