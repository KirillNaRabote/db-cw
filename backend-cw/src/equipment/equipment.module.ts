import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { PrismaService } from "../prisma.service";
import { PaginationService } from "../pagination/pagination.service";
import { RentalPointService } from "../rental_point/rental_point.service";
import { RentalPointModule } from "../rental_point/rental_point.module";
import { PaginationModule } from "../pagination/pagination.module";

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, PrismaService, PaginationService, RentalPointService],
  imports: [PaginationModule, RentalPointModule]
})
export class EquipmentModule {}
