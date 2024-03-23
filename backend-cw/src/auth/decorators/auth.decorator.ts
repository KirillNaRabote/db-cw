import { applyDecorators, UseGuards } from "@nestjs/common";
import { TypeRole } from "../auth.interface";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { OnlyAdminGuard } from "../guards/admin.guard";

export const Auth = (role: TypeRole = <TypeRole>process.env.USER) =>
  applyDecorators(
    role === <TypeRole>process.env.ADMIN
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard)
  )