import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  organization_id: string
  name: string
  about_me: string
  age_category: 'CUB' | 'ADULT' | 'ELDERLY'
  energy_level: number
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  level_of_idependence: 'LOW' | 'MEDIUM' | 'HIGH'
  recommended_environment_size: 'SMALL' | 'MEDIUM' | 'BIG'
  images_url: string[]
  requirements_for_adoption: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    organization_id,
    name,
    about_me,
    age_category,
    energy_level,
    size,
    level_of_idependence,
    recommended_environment_size,
    images_url,
    requirements_for_adoption,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organization_id,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      organization_id,
      name,
      about_me,
      age_category,
      energy_level,
      size,
      level_of_idependence,
      recommended_environment_size,
      images_url,
      requirements_for_adoption,
    })

    return {
      pet,
    }
  }
}
