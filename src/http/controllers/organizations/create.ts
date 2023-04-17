import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string().trim().min(3),
    address: z.string().trim().min(6),
    zip_code: z
      .string()
      .trim()
      .regex(/^\d{8}$/),
    city: z.string().trim().min(3),
    federal_unit: z.string().trim().length(2).toUpperCase(),
    phone: z
      .string()
      .trim()
      .regex(/^\d{11}$/),
    email: z.string().trim().email(),
    password: z.string().min(6),
  })

  const {
    name,
    address,
    zip_code,
    city,
    federal_unit,
    phone,
    email,
    password,
  } = createOrganizationBodySchema.parse(request.body)

  try {
    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    await createOrganizationUseCase.execute({
      name,
      address,
      zip_code,
      city,
      federal_unit,
      phone,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
