import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { RentDto } from "./rent.dto";

@Injectable()
export class RentService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.rent.findMany({
      /*select: {
        ...returnRentObjectFullest,
        user: {
          select: {
            ...returnUserObject
          }
        },
        equipment: {
          select: {
            price: true,
            status: true
          }
        }
      },*/
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async getByUserId(idUser: number) {
    return this.prisma.rent.findMany({
      where: {
        idUser
      },
      /*select: {
        ...returnRentObjectFullest,
        user: {
          select: {
            ...returnUserObject
          }
        },
        equipment: {
          select: {
            price: true,
            status: true
          }
        }
      },*/
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async placeRent(dto: RentDto, idUser: number) {
    return this.prisma.rent.create({
      data: {
        startTime: dto.startTime,
        endTime: dto.endTime,
        user: {
          connect: {
            idUser: idUser
          }
        },
        equipment: {
          connect: {
            idEquipment: dto.idEquipment
          }
        }
      }
    })
  }
}
