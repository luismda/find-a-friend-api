import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
  page: number
  additionalFilters?: {
    age_category?: 'CUB' | 'ADULT' | 'ELDERLY'
    energy_level?: number
    size?: 'SMALL' | 'MEDIUM' | 'BIG'
    level_of_independence?: 'LOW' | 'MEDIUM' | 'HIGH'
  }
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    additionalFilters,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity({
      city,
      page,
      additionalFilters,
    })

    return {
      pets,
    }
  }
}
