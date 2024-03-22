import { Prisma } from "@prisma/client";
import { ArrayMinSize, IsNumber, IsString } from "class-validator";

export class EquipmentDto implements Prisma.
  EquipmentUpdateInput{
  @IsNumber()
  idEquipmentName: number

  @IsNumber()
  price: number

  @IsString({each: true})
  @ArrayMinSize(1)
  images: string[]

  @IsNumber()
  idRentalPoint: number
}