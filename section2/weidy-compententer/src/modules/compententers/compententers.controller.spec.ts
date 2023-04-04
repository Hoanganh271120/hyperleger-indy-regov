import { Test, TestingModule } from '@nestjs/testing';
import { CompententersController } from './compententers.controller';

describe('CompententersController', () => {
  let controller: CompententersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompententersController],
    }).compile();

    controller = module.get<CompententersController>(CompententersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
