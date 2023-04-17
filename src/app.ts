import fastify from 'fastify'
import { ZodError } from 'zod'

import { organizationsRoutes } from './http/controllers/organizations/routes'
import { env } from './env'

export const app = fastify()

app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Log error to external service (DataDog, NewRelic, Sentry)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
