import { IsDate, IsNumber } from "class-validator";

export class RentDto {
  @IsDate()
  startTime: Date

  @IsDate()
  endTime: Date

  @IsNumber()
  idEquipment: number
}