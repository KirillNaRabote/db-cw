import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthDto } from "./dto/auth.dto";
import { faker } from "@faker-js/faker";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private userService: UserService) {}


  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.idUser)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.userService.byId(result.idUser, {
      idRole: true
    })

    const tokens = await this.issueTokens(user.idUser)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }


  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (oldUser !== null) {
      throw new BadRequestException('User already exists')
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('+7 (###) ### ##-##'),
        password: await hash(dto.password),
        role: {
          connect: {
            idRole: 1
          }
        }
      }
    })

    const tokens = await this.issueTokens(user.idUser)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  private async issueTokens(idUser: number) {
    const data = {idUser: idUser}

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return {accessToken, refreshToken}
  }

  private returnUserFields(user: User) {
    return {
      idUser: user.idUser,
      email: user.email,
      idRole: user.idRole
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}
