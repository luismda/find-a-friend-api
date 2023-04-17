import { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { details } from './details'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create)
  app.post('/organizations/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/organizations/me', { onRequest: [verifyJWT] }, details)
}
