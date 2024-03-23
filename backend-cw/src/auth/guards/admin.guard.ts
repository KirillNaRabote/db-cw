import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "../../user/user.service";

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{user: User}>()
    const user = request.user
    const role = await UserService.prototype.getRole(user.idUser)

    if (role.title == process.env.ADMIN)
      throw new ForbiddenException("Don't have rights")

    return true
  }
}