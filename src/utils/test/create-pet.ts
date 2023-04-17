import { PetCreateInput, PetsRepository } from '@/repositories/pets-repository'

export async function createPet(
  petsRepository: PetsRepository,
  replace?: Partial<PetCreateInput>,
) {
  const defaultPet: PetCreateInput = {
    organization_id: 'org-id',
    name: 'Snoop',
    about_me: "I'am a very funny dog!",
    age_category: 'CUB',
    energy_level: 5,
    level_of_independence: 'MEDIUM',
    recommended_environment_size: 'BIG',
    size: 'SMALL',
    images_url: [],
    requirements_for_adoption: ['Apartament is prohibited'],
  }

  const pet = await petsRepository.create({ ...defaultPet, ...(replace ?? {}) })

  return {
    pet,
  }
}
