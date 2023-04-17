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

        if (additionalFilters) {
          const filters = Object.keys(
            additionalFilters,
          ) as (keyof typeof additionalFilters)[]

          for (const filter of filters) {
            if (item[filter] !== additionalFilters[filter]) {
              return false
            }
          }
        }

        return organizationCity === city
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
