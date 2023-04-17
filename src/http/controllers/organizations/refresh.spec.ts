import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    const refreshTokenResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(refreshTokenResponse.statusCode).toEqual(200)
    expect(refreshTokenResponse.body).toEqual({
      token: expect.any(String),
    })
    expect(refreshTokenResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
