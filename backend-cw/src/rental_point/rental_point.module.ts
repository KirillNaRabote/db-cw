import { Module } from '@nestjs/common';
import { RentalPointService } from './rental_point.service';
import { RentalPointController } from './rental_point.controller';
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [RentalPointController],
  providers: [RentalPointService, PrismaService],
  exports: [RentalPointService]
})
export class RentalPointModule {}
