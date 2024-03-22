import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async getMain(userId: number) {
    const user = await this.userService.byId(userId, {
      rents: true,
      favorites: true
    })

    return [
      {
        name: "Rents",
        value: user.rents.length
      },
      {
        name: "Favorites",
        value: user.favorites.length
      },
      {
        name: "Total amount",
        value: 1000
      },
    ]
  }
}
