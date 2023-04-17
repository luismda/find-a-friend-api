import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrganizationDetailsUseCase } from '@/use-cases/factories/make-get-organization-details-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getOrganizationDetailsUseCase = makeGetOrganizationDetailsUseCase()

    const { organization } = await getOrganizationDetailsUseCase.execute({
      organizationId: request.user.sub,
    })

    return reply.status(200).send({
      organization: {
        ...organization,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
