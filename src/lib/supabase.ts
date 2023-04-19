import { env } from '@/env'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)

async function setup() {
  const { data } = await supabase.storage.getBucket(env.SUPABASE_PETS_BUCKET)

  if (!data) {
    const { error } = await supabase.storage.createBucket(
      env.SUPABASE_PETS_BUCKET,
      {
        public: true,
      },
    )

    if (error) {
      throw new Error(error.message)
    }
  }
}

setup()
