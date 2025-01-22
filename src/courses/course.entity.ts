import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
}
