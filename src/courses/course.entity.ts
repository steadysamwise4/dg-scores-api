import { Round } from 'src/rounds/round.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

export enum LengthOption {
  SHORT = 'short',
  AVERAGE = 'average',
  LONG = 'long',
}

export enum DifficultyOption {
  EASY = 'easy',
  AVERAGE = 'average',
  HARD = 'hard',
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: LengthOption,
  })
  length: LengthOption;

  @Column({
    type: 'enum',
    enum: DifficultyOption,
  })
  difficulty: DifficultyOption;

  @Column({ type: 'float' })
  lng: number;

  @Column({ type: 'float' })
  lat: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Round, (round) => round.course)
  rounds: Round[];

  @ManyToOne(() => User, (user) => user.courses)
  user: User;

  @ManyToMany(() => User, (user) => user.favoriteCourses)
  favoritedBy: User[];
}
