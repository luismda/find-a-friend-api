import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrganizationDetailsUseCaseRequest {
  organizationId: string
}

interface GetOrganizationDetailsUseCaseResponse {
  organization: Organization
}

export class GetOrganizationDetailsUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationDetailsUseCaseRequest): Promise<GetOrganizationDetailsUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organizationId,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return {
      organization,
    }
  }
}
