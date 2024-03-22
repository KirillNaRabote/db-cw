import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { returnRentalPointObject } from "./return-rental-point.object";
import { RentalPointDto } from "./rental-point.dto";
import { generateSlug } from "../utils/generate-slug";

@Injectable()
export class RentalPointService {
  constructor(private prisma: PrismaService) {}

  async byId(idRentalPoint: number) {
    const rentalPoint = await this.prisma.rentalPoint.findUnique({
      where: {
        idRentalPoint
      },
      select: {
        ...returnRentalPointObject
      }
    })

    if (!rentalPoint) throw new NotFoundException('Rental point not found')

    return rentalPoint
  }

  async bySlug(slug: string) {
    const rentalPoint = await this.prisma.rentalPoint.findUnique({
      where: {
        slug
      },
      select: {
        ...returnRentalPointObject
      }
    })

    if (!rentalPoint) throw new NotFoundException('Rental point not found')

    return rentalPoint
  }

  async getAll() {
    return this.prisma.rentalPoint.findMany({
      select : {
        ...returnRentalPointObject
      }
    })
  }

  async create() {
    return this.prisma.rentalPoint.create({
      data: {
        city: '',
        street: '',
        house: '',
        slug: ''
      }
    })
  }

  async update(idRentalPoint: number, dto: RentalPointDto) {
    return this.prisma.rentalPoint.update({
      where: {
        idRentalPoint: idRentalPoint
      },
      data: {
        city: dto.city,
        street: dto.street,
        house: dto.house,
        slug: generateSlug(dto.city + '-' + dto.street + '-' + dto.house)
      }
    })
  }

  async delete(idRentalPoint: number) {
    return this.prisma.rentalPoint.delete({
      where: {
        idRentalPoint: idRentalPoint
      }
    })
  }
}
