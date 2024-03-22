import { IsNumber, IsString, Max, Min } from "class-validator";

export class FeedbackDto {
  @Min(1)
  @Max(5)
  @IsNumber()
  mark: number

  @IsString()
  comment: string
}