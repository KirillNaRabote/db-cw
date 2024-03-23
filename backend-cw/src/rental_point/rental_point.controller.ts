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
import { TypeRole } from "../auth/auth.interface";

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

  @Auth(<TypeRole>process.env.ADMIN)
  @HttpCode(200)
  @Post()
  async createRentalPoint() {
    return this.rentalPointService.create();
  }

  @UsePipes(new ValidationPipe())
  @Auth(<TypeRole>process.env.ADMIN)
  @HttpCode(200)
  @Put(':idRentalPoint')
  async updateRentalPoint(@Param('idRentalPoint') idRentalPoint: number, @Body() dto: RentalPointDto) {
    return this.rentalPointService.update(+idRentalPoint, dto);
  }

  @HttpCode(200)
  @Auth(<TypeRole>process.env.ADMIN)
  @Delete(':idRentalPoint')
  async delete(@Param('idRentalPoint') idRentalPoint: number) {
    return this.rentalPointService.delete(+idRentalPoint);
  }
}
