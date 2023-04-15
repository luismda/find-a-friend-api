import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetCreateInput, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string, page: number) {
    const pets = this.items
      .filter((item) => {
        const organizationCity = item.organization_id

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
      level_of_idependence: data.level_of_idependence,
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
