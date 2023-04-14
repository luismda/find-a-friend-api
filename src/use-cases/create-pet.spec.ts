import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcrypt'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create a pet', async () => {
    const organization = await organizationsRepository.create({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      zip_code: '12345-000',
      phone: '19976542391',
      email: 'org123@example.com',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      organization_id: organization.id,
      name: 'Snoop',
      about_me: "I'am a very funny dog!",
      age_category: 'CUB',
      energy_level: 5,
      level_of_idependence: 'MEDIUM',
      recommended_environment_size: 'BIG',
      size: 'SMALL',
      images_url: ['https://github.com/luismda.png'],
      requirements_for_adoption: ['Apartament is prohibited'],
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(petsRepository.items).toEqual([
      expect.objectContaining({
        name: 'Snoop',
      }),
    ])
  })

  it('should not be able to create a pet with a inexisting organization', async () => {
    await expect(() =>
      sut.execute({
        organization_id: 'inexisting-organization-id',
        name: 'Snoop',
        about_me: "I'am a very funny dog!",
        age_category: 'CUB',
        energy_level: 5,
        level_of_idependence: 'MEDIUM',
        recommended_environment_size: 'BIG',
        size: 'SMALL',
        images_url: ['https://github.com/luismda.png'],
        requirements_for_adoption: ['Apartament is prohibited'],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
