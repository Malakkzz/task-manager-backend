import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  //This is an async method that accepts:
  //createTaskDto: the data to create a task (includes title, isCompleted)
  //user: the user who owns the task.
  async create(createTaskDto: CreateTaskDto, userId: number) {
    //Creates a new task object, including the user object in the relationship.
    //...createTaskDto spreads task properties (like title, description, etc.)
    //user sets the foreign key/relationship.
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const task = this.taskRepo.create({
      ...createTaskDto,
      user, //now we are sure 'user' is not null
    });

    return this.taskRepo.save(task); //save task in db
  }

  //return all tasks for the authenticated user.
  async findAll(userId: number) {
    //where: { user: { id: user.id } } is how TypeORM filters by a foreign key (user) using a nested object.
    return this.taskRepo.find({ where: { user: { id: userId } } });
  }

  async update(
    id: number,
    updateTaskDto: Partial<UpdateTaskDto>, //We use Partial<CreateTaskDto> to allow updating only some fields (title, description)
    userId: number,
  ): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTaskDto); //Merge changes
    return this.taskRepo.save(task); //Save updated task
  }

  // Remove a task owned by the current user
  async remove(id: number, userId: number) {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.taskRepo.remove(task);
  }
}
