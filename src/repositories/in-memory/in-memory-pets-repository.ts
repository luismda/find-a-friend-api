import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  FindManyByCityParams,
  PetCreateInput,
  PetsRepository,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity({
    city,
    page,
    additionalFilters,
  }: FindManyByCityParams) {
    const pets = this.items
      .filter((item) => {
        const organizationCity = item.organization_id

        return organizationCity === city
      })
      .filter((item) => {
        if (!additionalFilters?.age_category) {
          return true
        }

        return item.age_category === additionalFilters.age_category
      })
      .filter((item) => {
        if (!additionalFilters?.energy_level) {
          return true
        }

        return item.energy_level === additionalFilters.energy_level
      })
      .filter((item) => {
        if (!additionalFilters?.size) {
          return true
        }

        return item.size === additionalFilters.size
      })
      .filter((item) => {
        if (!additionalFilters?.level_of_independence) {
          return true
        }

        return (
          item.level_of_independence === additionalFilters.level_of_independence
        )
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async create(data: PetCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      organization_id: data.organization_id,
      name: data.name,
      about_me: data.about_me,
      age_category: data.age_category,
      energy_level: data.energy_level,
      level_of_independence: data.level_of_independence,
      recommended_environment_size: data.recommended_environment_size,
      images_url: data.images_url,
      requirements_for_adoption: data.requirements_for_adoption,
      size: data.size,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
