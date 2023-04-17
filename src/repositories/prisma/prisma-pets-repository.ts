import {
  FindManyByCityParams,
  PetCreateInput,
  PetsRepository,
} from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCity({
    city,
    page,
    additionalFilters,
  }: FindManyByCityParams) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
        ...(additionalFilters ?? {}),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
