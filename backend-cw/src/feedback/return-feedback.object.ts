import { Prisma } from "@prisma/client";
import { returnRentObject } from "../rent/return-rent.object";

export const returnFeedbackObject: Prisma.FeedbackSelect = {
  createdAt: true,
  idFeedback: true,
  mark: true,
  comment: true,
  rent: {
    select: {
      ...returnRentObject
    }
  }
}