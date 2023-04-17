import { describe, it, expect, beforeEach } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { createPet } from '@/utils/test/create-pet'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets by City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets of a city', async () => {
    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Snoop',
    })

    await createPet(petsRepository, {
      organization_id: 'Rio de Janeiro',
      name: 'Bob',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Snoop',
      }),
    ])
  })

  it('should be able to fetch paginated pets', async () => {
    for (let i = 1; i <= 22; i++) {
      await createPet(petsRepository, {
        organization_id: 'São Paulo',
        name: `Snoop ${i}`,
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

  it('should be able to fetch filtered pets by age category', async () => {
    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Snoop',
      age_category: 'CUB',
    })

    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Bob',
      age_category: 'ADULT',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
      additionalFilters: {
        age_category: 'ADULT',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Bob',
      }),
    ])
  })

  it('should be able to fetch filtered pets by energy level', async () => {
    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Snoop',
      energy_level: 5,
    })

    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Bob',
      energy_level: 4,
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
      additionalFilters: {
        energy_level: 4,
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Bob',
      }),
    ])
  })

  it('should be able to fetch filtered pets by size', async () => {
    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Snoop',
      size: 'SMALL',
    })

    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Bob',
      size: 'BIG',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
      additionalFilters: {
        size: 'BIG',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Bob',
      }),
    ])
  })

  it('should be able to fetch filtered pets level of independence', async () => {
    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Snoop',
      level_of_independence: 'HIGH',
    })

    await createPet(petsRepository, {
      organization_id: 'São Paulo',
      name: 'Bob',
      level_of_independence: 'LOW',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
      additionalFilters: {
        level_of_independence: 'LOW',
      },
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Bob',
      }),
    ])
  })
})
