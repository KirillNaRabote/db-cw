import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { PrismaService } from "../prisma.service";
import { PaginationService } from "../pagination/pagination.service";

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, PrismaService, PaginationService],
})
export class EquipmentModule {}
