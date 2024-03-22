import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { generateSlug } from "../utils/generate-slug";
import { equipmentReturnObject, equipmentReturnObjectFullest } from "./return-equipment.object";
import { EquipmentDto } from "./dto/equipment.dto";
import { EnumEquipmentSort, GetAllEquipmentDto } from "./dto/get-all.equipments.dto";
import { Prisma } from "@prisma/client";
import { PaginationService } from "../pagination/pagination.service";
import { last } from "rxjs";

@Injectable()
export class EquipmentService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: GetAllEquipmentDto = {}) {
    const {sort, searchTerm} = dto

    const prismaSort: Prisma.EquipmentOrderByWithRelationInput[] = []
    if (sort === EnumEquipmentSort.LOW_PRICE) {
      prismaSort.push({price: 'asc'})
    } else if (sort === EnumEquipmentSort.HIGH_PRICE) {
      prismaSort.push({price: 'desc'})
    } else if (sort === EnumEquipmentSort.OLDEST) {
      prismaSort.push({createdAt: 'asc'})
    } else {
      prismaSort.push({createdAt: 'desc'})
    }

    const prismaSearchTermFilter: Prisma.EquipmentWhereInput
    = searchTerm ? {
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
    } : {}

    const {perPage, skip} = this.paginationService.getPagination(dto)

    const equipments = await this.prisma.equipment.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip: skip,
      take: perPage,
      select: equipmentReturnObjectFullest
    })

    return {
      equipments,
      length: await this.prisma.equipment.count({
        where: prismaSearchTermFilter
      })
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
        rentalPoint: {
          slug: currentEquipment.rentalPoint.slug
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
