import { Prisma, Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      zip_code: data.zip_code,
      address: data.address,
      city: data.city,
      federal_unit: data.federal_unit,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
