import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await request(app.server).post('/organizations').send({
    name: 'Adopt your Mate',
    address: 'Street ABC, 123',
    city: 'São Paulo',
    federal_unit: 'SP',
    zip_code: '12345000',
    phone: '19976542391',
    email: 'org123@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server)
    .post('/organizations/sessions')
    .send({
      email: 'org123@example.com',
      password: '123456',
    })

  const token: string = authResponse.body.token

  return {
    token,
  }
}
