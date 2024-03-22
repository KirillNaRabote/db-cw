import { Prisma } from "@prisma/client";

export const returnRentObject: Prisma.RentSelect = {
  startTime: true,
  endTime: true
}