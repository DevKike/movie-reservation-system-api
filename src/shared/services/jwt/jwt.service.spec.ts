import { Test, TestingModule } from '@nestjs/testing';
import { JwtProvider } from './jwt.service';

describe('JwtService', () => {
  let service: JwtProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtProvider],
    }).compile();

    service = module.get<JwtProvider>(JwtProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
