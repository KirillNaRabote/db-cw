import { Prisma } from "@prisma/client";

export const returnRentalPointObject: Prisma.RentalPointSelect = {
  idRentalPoint: true,
  slug: true,
  city: true,
  street: true,
  house: true
}