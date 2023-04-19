import { FastifyInstance } from 'fastify'

import { create } from './create'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { validateAndFormatImagesToUpload } from '@/http/middlewares/validate-and-format-images-to-upload'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      onRequest: [verifyJWT],
      preHandler: [validateAndFormatImagesToUpload],
    },
    create,
  )
}
