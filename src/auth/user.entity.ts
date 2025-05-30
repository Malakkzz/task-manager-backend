import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Task } from '../task/task.entity';
import { OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
