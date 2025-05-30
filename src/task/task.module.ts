import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { User } from '../auth/user.entity'; // ✅ Import User

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]) // ✅ Register both Task and User
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
