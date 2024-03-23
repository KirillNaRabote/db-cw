import { Prisma } from "@prisma/client";
import { returnRentalPointObject } from "../rental_point/return-rental-point.object";
import { returnFeedbackObject } from "../feedback/return-feedback.object";

export const equipmentReturnObject: Prisma.EquipmentSelect = {
  images: true,
  idEquipment: true,
  equipmentName: {
    select: {
      name: true
    }
  },
  price: true,
  createdAt: true,
  slug: true,
  rentalPoint: {select: returnRentalPointObject},
  rents: {
    select: {
      feedbacks: {
        select: returnFeedbackObject,
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  }
}

export const equipmentReturnObjectFullest: Prisma.EquipmentSelect = {
  ...equipmentReturnObject,
  rentalPoint: {
    select: returnRentalPointObject
  },
}