import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { generateSlug } from "../utils/generate-slug";
import { equipmentReturnObject, equipmentReturnObjectFullest } from "./return-equipment.object";
import { EquipmentDto } from "./dto/equipment.dto";
import { EnumEquipmentSort, GetAllEquipmentDto } from "./dto/get-all.equipments.dto";
import { Prisma } from "@prisma/client";
import { PaginationService } from "../pagination/pagination.service";
import { RentalPointService } from "../rental_point/rental_point.service";
import { convertToNumber } from "../utils/convert-to-number";

@Injectable()
export class EquipmentService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    private rentalPointService: RentalPointService
  ) {}

  async getAll(dto: GetAllEquipmentDto = {}) {
    const filters = this.createFilter(dto)

    const {perPage, skip} = this.paginationService.getPagination(dto)

    const equipments = await this.prisma.equipment.findMany({
      where: filters,
      orderBy: this.getSortOption(dto.sort),
      skip: skip,
      take: perPage,
      select: equipmentReturnObjectFullest
    })

    return {
      equipments,
      length: await this.prisma.equipment.count({
        where: filters
      })
    }
  }

  private createFilter(dto: GetAllEquipmentDto): Prisma.EquipmentWhereInput {
    const filters: Prisma.EquipmentWhereInput[] = []

    if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

    if(dto.ratings) filters.push(this.getRatingFilter(
      dto.ratings
        .split('|')
        .map(rating => +rating)))

    if (dto.minPrice || dto.maxPrice) filters.push(this.getPriceFilter(
      convertToNumber(dto.minPrice),
      convertToNumber(dto.maxPrice)
    ))

    if (dto.idRentalPoint) filters.push(this.getRentalPointFilter(+dto.idRentalPoint))

    return filters.length ? {AND: filters} : {}
  }

  private getSortOption(sort: EnumEquipmentSort): Prisma.EquipmentOrderByWithRelationInput[] {
    switch (sort) {
      case EnumEquipmentSort.LOW_PRICE:
        return [{price: 'asc'}]
      case EnumEquipmentSort.HIGH_PRICE:
        return [{price: 'desc'}]
      case EnumEquipmentSort.OLDEST:
        return [{createdAt: 'asc'}]
      default:
        return [{createdAt: 'desc'}]
    }
  }

  private getSearchTermFilter(searchTerm: string): Prisma.EquipmentWhereInput {
    return {
      OR: [
        {
          equipmentName: {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        },
      ]
    }
  }

  private getRatingFilter(ratings: number[]): Prisma.EquipmentWhereInput {
    return {
      rents: {
        some: {
          feedbacks: {
            some: {
              mark: {
                in: ratings
              }
            }
          }
        }
      }
    }
  }

  private getPriceFilter(minPrice?: number, maxPrice?: number): Prisma.EquipmentWhereInput {
    let priceFilter: Prisma.IntFilter | undefined = undefined

    if (minPrice) {
      priceFilter = {
        ...priceFilter,
        gte: minPrice
      }
    }

    if (maxPrice) {
      priceFilter = {
        ...priceFilter,
        lte: maxPrice
      }
    }

    return {
      price: priceFilter
    }
  }

  private getRentalPointFilter(idRentalPoint: number): Prisma.EquipmentWhereInput {
    return {
      idRentalPoint
    }
  }

  async byId(idEquipment: number) {
    const equipment = await this.prisma.equipment.findUnique({
      where: {
        idEquipment
      },
      select: {
        ...equipmentReturnObjectFullest
      }
    })

    if (!equipment) throw new NotFoundException('Equipment not found')

    return equipment
  }

  async bySlug(slug: string) {
    const equipment = await this.prisma.equipment.findUnique({
      where: {
        slug
      },
      select: {
        ...equipmentReturnObjectFullest
      }
    })

    if (!equipment) throw new NotFoundException('Equipment not found')

    return equipment
  }

  async byRentalPoint(rentalPointSlug: string) {
    const equipment = await this.prisma.equipment.findMany({
      where: {
        rentalPoint: {
          slug: rentalPointSlug
        }
      },
      select: {
        ...equipmentReturnObjectFullest
      }
    })

    if (!equipment) throw new NotFoundException('Equipment not found')

    return equipment
  }

  async getSimilar(idEquipment: number) {
    const currentEquipment = await this.byId(idEquipment)

    if (!currentEquipment)
      throw new NotFoundException('Current equipment not found')

    const equipments = await this.prisma.equipment.findMany({
      where: {
        equipmentName: {
          name: currentEquipment.equipmentName.name
        },
        NOT: {
          idEquipment: currentEquipment.idEquipment
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: equipmentReturnObject
    })

    return equipments
  }

  async create() {
    //TODO чет со слагом сделать
    const lastEquipment = await this.prisma.equipment.findMany({
      orderBy: {
        idEquipment: 'desc'
      },
      select: {
        idEquipment: true
      }
    })

    const lastId = lastEquipment[0].idEquipment

    const equipment = await this.prisma.equipment.create({
      data: {
        price: 0.0,
        images: [],
        slug: `${lastId + 1}`
      }
    })

    return equipment.idEquipment
  }

  async update(idEquipment: number, dto: EquipmentDto) {
    await this.rentalPointService.byId(dto.idRentalPoint)

    return this.prisma.equipment.update({
      where: {
        idEquipment
      },
      data: {
        images: dto.images,
        price: dto.price,
        rentalPoint: {
          connect: {
            idRentalPoint: dto.idRentalPoint
          }
        },
        equipmentName: {
          connect: {
            idEquipmentName: dto.idEquipmentName
          }
        },
        slug: generateSlug('')
      }
    })
  }

  async delete(idEquipment: number) {
    return this.prisma.equipment.delete({
      where: {
        idEquipment
      }
    })
  }
}
