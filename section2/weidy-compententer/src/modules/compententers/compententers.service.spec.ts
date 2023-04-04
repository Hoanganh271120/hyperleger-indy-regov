import { Test, TestingModule } from '@nestjs/testing';
import { CompententersService } from './compententers.service';

describe('CompententersService', () => {
  let service: CompententersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompententersService],
    }).compile();

    service = module.get<CompententersService>(CompententersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
