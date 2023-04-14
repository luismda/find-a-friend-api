import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcrypt'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { GetOrganizationProfileUseCase } from './get-organization-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationProfileUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })

  it('should be able to get a organization profile', async () => {
    const createdOrganization = await organizationsRepository.create({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        name: 'Adopt your Mate',
        address: 'Street ABC, 123',
        zip_code: '12345-000',
        phone: '19976542391',
        email: 'org123@example.com',
      }),
    )
  })

  it('should not be able to get a organization profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
