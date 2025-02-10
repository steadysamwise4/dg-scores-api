import { Course } from 'src/courses/course.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column('int', { array: true, default: [] })
  holeScores: number[];

  @Column('int', { default: 0 })
  total: number;

  @Column('boolean', { default: false })
  isNine: boolean;

  @Column('boolean', { default: false })
  isComplete: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.rounds)
  user: User;

  @ManyToOne(() => Course, (course) => course.rounds)
  course: Course;
}
