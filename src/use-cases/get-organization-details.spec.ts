import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcrypt'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { GetOrganizationDetailsUseCase } from './get-organization-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationDetailsUseCase

describe('Get Organization Details Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationDetailsUseCase(organizationsRepository)
  })

  it('should be able to get a organization details', async () => {
    const createdOrganization = await organizationsRepository.create({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      city: 'São Paulo',
      federal_unit: 'SP',
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

  it('should not be able to get a organization details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
