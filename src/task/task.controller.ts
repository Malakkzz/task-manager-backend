import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from '../auth/get-user.decorator';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUserId() userId: number) {
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@GetUserId() userId: number) {
    return this.taskService.findAll(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, //Extracts id from the URL and ensures it's a number.
    @Body() updateTaskDto: UpdateTaskDto, //Gets the data sent in the request body (like title, description, etc.).
    @GetUserId() userId: number, //Custom decorator that extracts the currently logged-in user’s ID from the JWT
  ) {
    return this.taskService.update(id, updateTaskDto, userId); //it calls this.taskService.update(...) and passes the task ID, updated data, and user ID to the service layer.
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUserId() userId: number) {
    return this.taskService.remove(+id, userId);
  }
}
