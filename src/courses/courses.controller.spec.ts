import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { JwtService } from '@nestjs/jwt';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const mockCourseService = {
      create: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue({}),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockedToken'),
      verify: jest.fn().mockReturnValue({ sub: 'mockedUserId' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: mockCourseService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
