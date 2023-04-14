import { describe, it, expect, beforeEach } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcrypt'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create a organization', async () => {
    const { organization } = await sut.execute({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organizationsRepository.items).toEqual([
      expect.objectContaining({
        name: 'Adopt your Mate',
      }),
    ])
  })

  it('should be able to hash organization password upon creation', async () => {
    const { organization } = await sut.execute({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create a organization with same email twice', async () => {
    const organization = {
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password: '123456',
    }

    await sut.execute(organization)

    await expect(() => sut.execute(organization)).rejects.toBeInstanceOf(
      OrganizationAlreadyExistsError,
    )
  })
})
