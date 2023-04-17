import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { GetOrganizationDetailsUseCase } from '../get-organization-details'

export function makeGetOrganizationDetailsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new GetOrganizationDetailsUseCase(organizationsRepository)

  return useCase
}
