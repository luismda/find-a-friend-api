import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { resolve } from 'node:path'
import { app } from '@/app'
import { supabase } from '@/lib/supabase'
import { env } from '@/env'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    await supabase.storage.emptyBucket(env.SUPABASE_PETS_BUCKET)
  })

  afterAll(async () => {
    await supabase.storage.emptyBucket(env.SUPABASE_PETS_BUCKET)

    await app.close()
  })

  it(
    'should be able to create a pet',
    async () => {
      const { token } = await createAndAuthenticateOrganization(app)

      const response = await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .field('name', 'Snoop')
        .field('about_me', "I'am a very funny dog!")
        .field('age_category', 'CUB')
        .field('energy_level', 3)
        .field('size', 'SMALL')
        .field('level_of_independence', 'HIGH')
        .field('recommended_environment_size', 'SMALL')
        .field(
          'requirements_for_adoption',
          JSON.stringify(['Apartament is prohibited']),
        )
        .attach(
          'image',
          resolve('src/http/controllers/pets/test/image/pet.png'),
        )

      expect(response.statusCode).toEqual(201)
    },
    {
      timeout: 8000,
    },
  )
})
