import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from './user.service';
import { CurrentUser } from "../auth/decorators/user.decorator";
import { UserDto } from "./user.dto";
import { Auth } from "../auth/decorators/auth.decorator";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('idUser') idUser: number) {
    return this.userService.byId(idUser);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put('profile')
  async updateProfile(@CurrentUser('idUser') idUser: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(idUser, dto);
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:idEquipment')
  async toggleFavorite(
    @CurrentUser('idUser') idUser: number,
    @Param('idEquipment') idEquipment: string
  ) {
    return this.userService.toggleFavorite(idUser, +idEquipment);
  }
}
