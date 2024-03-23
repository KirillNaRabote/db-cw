import { Controller, Get } from "@nestjs/common";
import { StatisticsService } from './statistics.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { TypeRole } from "../auth/auth.interface";

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth(<TypeRole>process.env.ADMIN)
  getMainStatistics() {
    return this.statisticsService.getMain()
  }
}
