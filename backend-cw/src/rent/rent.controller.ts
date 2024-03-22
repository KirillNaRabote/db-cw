import { Controller, Get } from "@nestjs/common";
import { RentService } from './rent.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";

@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get()
  @Auth()
  getAll(@CurrentUser('idUser') idUser: number) {
    return this.rentService.getAll(idUser)
  }
}
