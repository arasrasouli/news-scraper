import { Test, TestingModule } from '@nestjs/testing';
import { NewsPatternResolver } from './news-pattern.resolver';

describe('NewsPatternResolver', () => {
  let resolver: NewsPatternResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsPatternResolver],
    }).compile();

    resolver = module.get<NewsPatternResolver>(NewsPatternResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
