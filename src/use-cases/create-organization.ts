import { Organization } from '@prisma/client'
import { hash } from 'bcrypt'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  name: string
  address: string
  zip_code: string
  phone: string
  email: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    address,
    phone,
    zip_code,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      zip_code,
      address,
      phone,
      password_hash,
    })

    return {
      organization,
    }
  }
}
