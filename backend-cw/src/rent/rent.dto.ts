import { IsDate } from "class-validator";

export class RentDto {
  @IsDate()
  startTime: Date

  @IsDate()
  endTime: Date
}