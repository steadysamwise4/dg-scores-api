import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;

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

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockedToken'),
      verify: jest.fn().mockReturnValue({ sub: 'mockedUserId' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
