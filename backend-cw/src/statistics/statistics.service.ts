import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async getMain() {
    const rentsCount = await this.prisma.rent.count()
    const feedbacksCount = await this.prisma.feedback.count()
    const usersCount = await this.prisma.user.count()

    return [
      {
        name: "Rents",
        value: rentsCount
      },
      {
        name: "Feedback",
        value: feedbacksCount
      },
      {
        name: "Users",
        value: usersCount
      },
    ]
  }
}
