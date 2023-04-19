import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet details', async () => {
    await createAndAuthenticateOrganization(app)
    const organization = await prisma.organization.findFirstOrThrow()

    const createdPet = await prisma.pet.create({
      data: {
        organization_id: organization.id,
        name: 'Snoop',
        about_me: "I'am a very funny dog!",
        age_category: 'CUB',
        energy_level: 5,
        level_of_independence: 'MEDIUM',
        recommended_environment_size: 'BIG',
        size: 'SMALL',
        images_url: [],
        requirements_for_adoption: ['Apartament is prohibited'],
      },
    })

    const petResponse = await request(app.server).get(`/pets/${createdPet.id}`)

    expect(petResponse.statusCode).toEqual(200)
    expect(petResponse.body.pet).toEqual(
      expect.objectContaining({
        name: 'Snoop',
        about_me: "I'am a very funny dog!",
        organization: expect.objectContaining({
          name: 'Adopt your Mate',
          phone: '19976542391',
        }),
      }),
    )
  })
})
