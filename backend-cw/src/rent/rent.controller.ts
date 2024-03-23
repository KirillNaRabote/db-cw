import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RentService } from './rent.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { RentDto } from "./rent.dto";
import * as process from "process";
import { TypeRole } from "../auth/auth.interface";

@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  @Auth(<TypeRole>process.env.ADMIN)
  getAll() {
    return this.rentService.getAll()
  }

  @Get('by-user')
  @Auth()
  getByUserId(@CurrentUser('idUser') idUser: number) {
    return this.rentService.getByUserId(idUser)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  placeRent(@Body() dto: RentDto, @CurrentUser('idUser') idUser: number) {
    return this.rentService.placeRent(dto, idUser)
  }
}
