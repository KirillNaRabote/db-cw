import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { generateSlug } from "../utils/generate-slug";
import { returnFeedbackObject } from "./return-feedback.object";
import { FeedbackDto } from "./feedback.dto";

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select : {
        ...returnFeedbackObject
      }
    })
  }

  async create(idRent: number, dto: FeedbackDto) {
    return this.prisma.feedback.create({
      data: {
        mark: dto.mark,
        comment: dto.comment,
        idRent: idRent
      }
    })
  }

  async getAverageValueByEquipmentId(idEquipment: number) {
    return this.prisma.feedback
      .aggregate({
        where: {
          rent: {
            idEquipment
          }
        },
        _avg: { mark: true }
      })
      .then(data => data._avg)
  }
}
