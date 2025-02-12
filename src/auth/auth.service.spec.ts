import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
