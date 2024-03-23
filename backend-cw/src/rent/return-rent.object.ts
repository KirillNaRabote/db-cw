import { Prisma } from "@prisma/client";

export const returnRentObject: Prisma.RentSelect = {
  startTime: true,
  endTime: true
}

export const returnRentObjectFullest: Prisma.RentSelect = {
  ...returnRentObject,
  createdAt: true,
  updatedAt: true,
  feedbacks: true
}