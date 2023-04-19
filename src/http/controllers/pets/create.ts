import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { generateFilenameToUpload } from '@/utils/generate-filename-to-upload'
import { env } from '@/env'
import { supabase } from '@/lib/supabase'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string().trim().min(1),
    about_me: z.string().trim().min(10),
    age_category: z.enum(['CUB', 'ADULT', 'ELDERLY']),
    energy_level: z.coerce.number().min(1).max(5),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    level_of_independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    recommended_environment_size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    requirements_for_adoption: z.array(z.string()),
    images: z
      .array(
        z.object({
          filename: z.string(),
          mimetype: z.string(),
          buffer: z.instanceof(Buffer),
        }),
      )
      .min(1)
      .max(6),
  })

  const {
    name,
    about_me,
    age_category,
    energy_level,
    size,
    level_of_independence,
    recommended_environment_size,
    requirements_for_adoption,
    images,
  } = createPetBodySchema.parse(request.body)

  try {
    const images_url: string[] = []

    for await (const image of images) {
      const filename = generateFilenameToUpload(image.filename)

      const { error } = await supabase.storage
        .from(env.SUPABASE_PETS_BUCKET)
        .upload(`images/${filename}`, image.buffer, {
          contentType: image.mimetype,
        })

      if (error) {
        return reply.status(500).send({ message: error.message })
      }

      const { data } = supabase.storage
        .from(env.SUPABASE_PETS_BUCKET)
        .getPublicUrl(`images/${filename}`)

      images_url.push(data.publicUrl)
    }

    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      about_me,
      age_category,
      energy_level,
      size,
      level_of_independence,
      recommended_environment_size,
      requirements_for_adoption,
      images_url,
      organization_id: request.user.sub,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
