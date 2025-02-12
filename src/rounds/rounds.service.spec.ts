import { Test, TestingModule } from '@nestjs/testing';
import { RoundsService } from './rounds.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Round } from './round.entity';
import { CoursesService } from '../courses/courses.service';

describe('RoundsService', () => {
  let service: RoundsService;

  beforeEach(async () => {
    const fakeUsersService: Partial<UsersService> = {
      findByEmail: () => Promise.resolve([]),
      create: (email: string, password: string, username: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
          username,
        } as User),
    };

    const mockCourseService = {
      create: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoundsService,
        {
          provide: getRepositoryToken(Round),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: CoursesService,
          useValue: mockCourseService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<RoundsService>(RoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
