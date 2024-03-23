import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "../../user/user.service";

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest<{user: User}>()
    const user = request.user

    const role = user.idRole

    if (role != +process.env.ID_ADMIN_ROLE)
      throw new ForbiddenException("Don't have rights")

    return true
  }
}