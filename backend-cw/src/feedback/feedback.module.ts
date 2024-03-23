import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { PrismaService } from "../prisma.service";
import { EquipmentService } from "../equipment/equipment.service";
import { EquipmentModule } from "../equipment/equipment.module";

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, PrismaService]
})
export class FeedbackModule {}
