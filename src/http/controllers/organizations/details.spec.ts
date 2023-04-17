import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Get Organization Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a organization details', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .get('/organizations/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.organization).toEqual(
      expect.objectContaining({
        name: 'Adopt your Mate',
        email: 'org123@example.com',
      }),
    )
  })
})
