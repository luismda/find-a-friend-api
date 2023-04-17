import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      city: 'São Paulo',
      federal_unit: 'SP',
      zip_code: '12345000',
      phone: '19976542391',
      email: 'org123@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
