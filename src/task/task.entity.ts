import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../auth/user.entity';
import { ManyToOne } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;
}
