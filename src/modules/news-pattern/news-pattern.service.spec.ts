import { Test, TestingModule } from '@nestjs/testing';
import { NewsPatternService } from './news-pattern.service';

describe('NewsPatternService', () => {
  let service: NewsPatternService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsPatternService],
    }).compile();

    service = module.get<NewsPatternService>(NewsPatternService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
