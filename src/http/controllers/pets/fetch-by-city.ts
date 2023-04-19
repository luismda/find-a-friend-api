import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsQuerySchema = z.object({
    city: z.string().trim().min(3),
    age_category: z.enum(['CUB', 'ADULT', 'ELDERLY']).optional(),
    energy_level: z.coerce.number().min(1).max(5).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    level_of_independence: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    page: z.coerce.number().default(1),
  })

  const {
    city,
    age_category,
    energy_level,
    size,
    level_of_independence,
    page,
  } = fetchPetsQuerySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    city,
    page,
    additionalFilters: {
      age_category,
      energy_level,
      size,
      level_of_independence,
    },
  })

  return reply.status(200).send({ pets })
}
