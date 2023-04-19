import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Fetch Pets By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    await request(app.server).post('/organizations').send({
      name: 'Adopt your Mate',
      address: 'Street ABC, 123',
      city: 'São Paulo',
      federal_unit: 'SP',
      zip_code: '12345000',
      phone: '19976542391',
      email: 'org-sp@example.com',
      password: '123456',
    })

    await request(app.server).post('/organizations').send({
      name: "Pet's house",
      address: 'Street CBA, 321',
      city: 'Rio de Janeiro',
      federal_unit: 'RJ',
      zip_code: '65432000',
      phone: '98777717717',
      email: 'org-rj@example.com',
      password: '123456',
    })

    const [firstOrganization, secondOrganization] =
      await prisma.organization.findMany({
        orderBy: {
          created_at: 'asc',
        },
      })

    await prisma.pet.createMany({
      data: [
        {
          organization_id: firstOrganization.id,
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
        {
          organization_id: secondOrganization.id,
          name: 'Bob',
          about_me: 'Very drooling...',
          age_category: 'ADULT',
          energy_level: 2,
          level_of_independence: 'LOW',
          recommended_environment_size: 'BIG',
          size: 'BIG',
          images_url: [],
          requirements_for_adoption: [],
        },
      ],
    })

    const petsResponse = await request(app.server).get('/pets').query({
      city: 'São Paulo',
    })

    expect(petsResponse.statusCode).toEqual(200)
    expect(petsResponse.body.pets).toEqual([
      expect.objectContaining({
        organization_id: firstOrganization.id,
        name: 'Snoop',
        about_me: "I'am a very funny dog!",
      }),
    ])
  })
})
