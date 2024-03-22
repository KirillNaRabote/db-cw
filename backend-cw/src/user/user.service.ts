import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { returnUserObject } from "./return-user.object";
import { Prisma} from "@prisma/client";
import { UserDto } from "./user.dto";
import { hash } from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(idUser: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        idUser
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            idEquipment: true,
            equipmentName: {
              select: {
                idEquipmentName: false,
                name: true,
              }
            },
            price: true,
            images: true,
            slug: true,
          }
        },
        ...selectObject
      }
    })

    if (!user) throw new Error('User not found')

    return user
  }

  async updateProfile(idUser: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (isSameUser && idUser !== isSameUser.idUser) throw new BadRequestException('Email already in use')

    const user = await this.byId(idUser)

    return this.prisma.user.update({
      where: {
        idUser,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password
      }
    })
  }

  async toggleFavorite(idUser: number, idEquipment: number) {
    const user = await this.byId(idUser)

    if (!user) throw new Error('User not found')

    const isExists = user.favorites.some(equipment =>
      equipment.idEquipment === idEquipment)

    await this.prisma.user.update({
      where: {
        idUser: user.idUser,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            idEquipment: idEquipment
          }
        }
      }
    })

    return {message: 'Success'}
  }
}
