import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { EquipmentModule } from './equipment/equipment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { RentModule } from './rent/rent.module';
import { RentalPointModule } from './rental_point/rental_point.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaginationModule } from './pagination/pagination.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    }),
    ConfigModule.forRoot(), AuthModule, UserModule, EquipmentModule, FeedbackModule, RentModule, RentalPointModule, StatisticsModule, PaginationModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
