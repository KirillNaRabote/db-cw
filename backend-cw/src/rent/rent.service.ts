import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";

@Injectable()
export class RentService {
  constructor(private prisma: PrismaService) {}

  async getAll(idUser: number) {
    return this.prisma.rent.findMany({
      where: {
        idUser
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
