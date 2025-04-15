import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      findByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string, username: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
          username,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const mockJwtService = {
      signAsync: jest.fn().mockReturnValue('mockedToken'),
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

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'asdf', 'discgolfer1');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with an email that is in use', async () => {
    await service.signup('test@test.com', 'asdf', 'discgolfer1');
    await expect(
      service.signup('test@test.com', 'asdf', 'discgolfer1'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('test@test.com', 'asdf2')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypassword', 'discgolfer1');
    await expect(service.signin('asdf@asdf.com', 'passowrd')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test@test.com', 'mypassword', 'discgolfer4');

    const user = await service.signin('test@test.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
