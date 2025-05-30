import { IsNotEmpty, IsString } from 'class-validator';


// @IsNotEmpty() ensures the title is not an empty string.
// @IsString() ensures the title must be a string (e.g., not a number, object, etc.).
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  description: string;
}
