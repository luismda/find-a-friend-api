import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcrypt'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate a organization', async () => {
    await organizationsRepository.create({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      email: 'org123@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a organization with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'org123@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a organization with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'org123@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
