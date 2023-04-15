import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get a pet details', async () => {
    const createdPet = await petsRepository.create({
      organization_id: 'org-id',
      name: 'Snoop',
      about_me: "I'am a very funny dog!",
      age_category: 'CUB',
      energy_level: 5,
      level_of_idependence: 'MEDIUM',
      recommended_environment_size: 'BIG',
      size: 'SMALL',
      images_url: [],
      requirements_for_adoption: ['Apartament is prohibited'],
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Snoop',
        about_me: "I'am a very funny dog!",
      }),
    )
  })

  it('should not be able to get a pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
