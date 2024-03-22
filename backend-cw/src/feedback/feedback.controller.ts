import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { FeedbackService } from './feedback.service';
import { Auth } from "../auth/decorators/auth.decorator";
import { FeedbackDto } from "./feedback.dto";

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  async getAll() {
    return this.feedbackService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post('create/:idRent')
  async createFeedback(@Param('idRent') idRent: number, @Body() dto: FeedbackDto) {
    return this.feedbackService.create(+idRent, dto);
  }

  @Get('average-by-equipment/:idEquipment')
  async getAverageByEquipment(@Param('idEquipment') idEquipment: string){
    return this.feedbackService.getAverageValueByEquipmentId(+idEquipment)
  }

}
