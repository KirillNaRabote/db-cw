import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { EquipmentService } from './equipment.service';
import { GetAllEquipmentDto } from "./dto/get-all.equipments.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { EquipmentDto } from "./dto/equipment.dto";

@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllEquipmentDto) {
    return this.equipmentService.getAll(queryDto)
  }

  @Get('similar/:idEquipment')
  async getSimilar(@Param('idEquipment') idEquipment: string) {
    return this.equipmentService.getSimilar(+idEquipment)
  }

  @Get('by-slug/:slug')
  async getEquipmentBySlug(@Param('slug') slug: string) {
    return this.equipmentService.bySlug(slug)
  }

  @Get('by-rental-point/:rentalPointSlug')
  async getEquipmentByRentalPoint(@Param('rentalPointSlug') rentalPointSlug: string) {
    return this.equipmentService.byRentalPoint(rentalPointSlug)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct() {
    return this.equipmentService.create()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':idEquipment')
  @Auth()
  async updateEquipment(@Param('idEquipment') idEquipment: string,
                        @Body() dto: EquipmentDto) {
    return this.equipmentService.update(+idEquipment, dto)
  }

  @HttpCode(200)
  @Delete(':idEquipment')
  @Auth()
  async deleteEquipment(@Param('idEquipment') idEquipment: string) {
    return this.equipmentService.delete(+idEquipment)
  }

  @Get(':idEquipment')
  @Auth()
  async getEquipment(@Param('idEquipment') idEquipment: string) {
    return this.equipmentService.byId(+idEquipment)
  }
}
