import { describe, it, expect, beforeEach } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets by City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets of a city', async () => {
    await petsRepository.create({
      organization_id: 'São Paulo',
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

    await petsRepository.create({
      organization_id: 'Rio de Janeiro',
      name: 'Bob',
      about_me: "I'am a very crazzy dog!",
      age_category: 'ADULT',
      energy_level: 4,
      level_of_idependence: 'LOW',
      recommended_environment_size: 'BIG',
      size: 'MEDIUM',
      images_url: [],
      requirements_for_adoption: ['Apartament is prohibited'],
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Snoop',
      }),
    ])
  })

  it('should be able to fetch paginated pets', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        organization_id: 'São Paulo',
        name: `Snoop ${i}`,
        about_me: "I'am a very funny dog!",
        age_category: 'CUB',
        energy_level: 5,
        level_of_idependence: 'MEDIUM',
        recommended_environment_size: 'BIG',
        size: 'SMALL',
        images_url: [],
        requirements_for_adoption: ['Apartament is prohibited'],
      })
    }

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Snoop 21' }),
      expect.objectContaining({ name: 'Snoop 22' }),
    ])
  })
})