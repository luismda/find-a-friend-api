import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a organization', async () => {
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

    const response = await request(app.server)
      .post('/organizations/sessions')
      .send({
        email: 'org123@example.com',
        password: '123456',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
