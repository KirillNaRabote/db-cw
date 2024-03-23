import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../pagination/pagination.dto";

export enum EnumEquipmentSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest'
}

export class GetAllEquipmentDto extends PaginationDto{
  @IsOptional()
  @IsEnum(EnumEquipmentSort)
  sort?: EnumEquipmentSort

  @IsOptional()
  @IsString()
  searchTerm?: string

  @IsOptional()
  @IsString()
  ratings?: string

  @IsOptional()
  @IsString()
  minPrice?: string

  @IsOptional()
  @IsString()
  maxPrice?: string

  @IsOptional()
  @IsString()
  idRentalPoint?: string
}