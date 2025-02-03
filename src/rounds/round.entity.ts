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

  @Column('int', { array: true })
  holeScores: number[];

  @Column()
  total: number;

  @Column()
  isNine: boolean;

  @Column()
  isComplete: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.rounds)
  user: User;
}
