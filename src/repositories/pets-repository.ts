import { Pet } from '@prisma/client'

export interface PetCreateInput {
  organization_id: string
  name: string
  about_me: string
  age_category: 'CUB' | 'ADULT' | 'ELDERLY'
  energy_level: number
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  level_of_independence: 'LOW' | 'MEDIUM' | 'HIGH'
  recommended_environment_size: 'SMALL' | 'MEDIUM' | 'BIG'
  images_url: string[]
  requirements_for_adoption: string[]
}

export interface FindManyByCityParams {
  city: string
  page: number
  additionalFilters?: {
    age_category?: 'CUB' | 'ADULT' | 'ELDERLY'
    energy_level?: number
    size?: 'SMALL' | 'MEDIUM' | 'BIG'
    level_of_independence?: 'LOW' | 'MEDIUM' | 'HIGH'
  }
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByCity(params: FindManyByCityParams): Promise<Pet[]>
  create(data: PetCreateInput): Promise<Pet>
}
