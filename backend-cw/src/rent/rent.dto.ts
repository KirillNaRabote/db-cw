import { IsNumber, IsString } from "class-validator";

export class RentDto {
  @IsString()
  startTime: string

  @IsString()
  endTime: string

  @IsNumber()
  idEquipment: number
}