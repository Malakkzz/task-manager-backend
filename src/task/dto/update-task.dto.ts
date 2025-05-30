import { IsBoolean } from 'class-validator';

// ensures isCompleted is boolean
export class UpdateTaskDto {
  @IsBoolean()
  isCompleted: boolean;
}
