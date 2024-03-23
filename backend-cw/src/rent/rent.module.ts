import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { PrismaService } from "../prisma.service";
import { EquipmentService } from "../equipment/equipment.service";
import { EquipmentModule } from "../equipment/equipment.module";
import { PaginationModule } from "../pagination/pagination.module";
import { RentalPointModule } from "../rental_point/rental_point.module";

@Module({
  controllers: [RentController],
  providers: [RentService, PrismaService, EquipmentService],
  imports: [EquipmentModule, PaginationModule, RentalPointModule]
})
export class RentModule {}
