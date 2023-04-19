import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrganizationDetailsUseCase } from '@/use-cases/factories/make-get-organization-details-use-case'
import { z } from 'zod'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetDetailsParamsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    const { pet } = await getPetDetailsUseCase.execute({
      petId,
    })

    const getOrganizationDetailsUseCase = makeGetOrganizationDetailsUseCase()

    const { organization } = await getOrganizationDetailsUseCase.execute({
      organizationId: pet.organization_id,
    })

    return reply.status(200).send({
      pet: {
        ...pet,
        organization_id: undefined,
        organization: {
          ...organization,
          email: undefined,
          password_hash: undefined,
        },
      },
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
