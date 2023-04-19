import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  SUPABASE_PETS_BUCKET: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables.')
}

if (_env.data.NODE_ENV !== 'production') {
  _env.data.SUPABASE_PETS_BUCKET = `${_env.data.NODE_ENV}-${_env.data.SUPABASE_PETS_BUCKET}`
}

export const env = _env.data
