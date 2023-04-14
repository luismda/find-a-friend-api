import { Pet } from '@prisma/client'

export interface PetCreateInput {
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

export interface PetsRepository {
  create(data: PetCreateInput): Promise<Pet>
}
