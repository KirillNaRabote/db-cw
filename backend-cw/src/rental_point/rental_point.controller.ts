import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { RentalPointService } from './rental_point.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { RentalPointDto } from "./rental-point.dto";

@Controller('rental-points')
export class RentalPointController {
  constructor(private readonly rentalPointService: RentalPointService) {}

  @Get()
  async getAll() {
    return this.rentalPointService.getAll();
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.rentalPointService.bySlug(slug);
  }

  @Get(':idRentalPoint')
  @Auth()
  async getById(@Param('idRentalPoint') idRentalPoint: number) {
    return this.rentalPointService.byId(+idRentalPoint);
  }

  @Auth()
  @HttpCode(200)
  @Post()
  async createRentalPoint() {
    return this.rentalPointService.create();
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put(':idRentalPoint')
  async updateRentalPoint(@Param('idRentalPoint') idRentalPoint: number, @Body() dto: RentalPointDto) {
    return this.rentalPointService.update(+idRentalPoint, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':idRentalPoint')
  async delete(@Param('idRentalPoint') idRentalPoint: number) {
    return this.rentalPointService.delete(+idRentalPoint);
  }
}
