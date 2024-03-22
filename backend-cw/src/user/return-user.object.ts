import { Prisma } from "@prisma/client";

export const returnUserObject: Prisma.UserSelect = {
  idUser: true,
  email: true,
  name: true,
  avatarPath: true,
  password: false,
  phone: true,
}