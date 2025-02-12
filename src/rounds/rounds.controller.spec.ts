import { Test, TestingModule } from '@nestjs/testing';
import { RoundsController } from './rounds.controller';
import { RoundsService } from './rounds.service';
import { JwtService } from '@nestjs/jwt';

describe('RoundsController', () => {
  let controller: RoundsController;

  beforeEach(async () => {
    const mockRoundService = {
      create: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockedToken'),
      verify: jest.fn().mockReturnValue({ sub: 'mockedUserId' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundsController],
      providers: [
        {
          provide: RoundsService,
          useValue: mockRoundService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<RoundsController>(RoundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
