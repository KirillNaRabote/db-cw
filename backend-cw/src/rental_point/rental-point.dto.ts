import { IsString } from "class-validator";

export class RentalPointDto {
  @IsString()
  city: string

  @IsString()
  street: string

  @IsString()
  house: string
}