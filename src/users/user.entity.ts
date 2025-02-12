import { Course } from '../courses/course.entity';
import { Round } from '../rounds/round.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column('int', { nullable: true })
  handicap: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Round, (round) => round.user)
  rounds: Round[];

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @ManyToMany(() => Course, (course) => course.favoritedBy)
  @JoinTable({ name: 'user-favorited-courses' })
  favoriteCourses: Course[];

  // @Column()
  // handicap: number;

  // favoriteCourses: any;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
