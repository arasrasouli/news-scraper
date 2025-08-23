import { Resolver, Query, Args } from '@nestjs/graphql';
import { AnalysisService } from './analysis.service';
import { AnalyzeArticleInput } from './dtos/analyze-article.input';
import { AnalyzeArticleResult } from './dtos/analyze-article.result';

@Resolver()
export class AnalysisResolver {
  constructor(private readonly analysisService: AnalysisService) {}

  @Query(() => AnalyzeArticleResult)
  analyzeArticle(
    @Args('input') input: AnalyzeArticleInput,
  ): AnalyzeArticleResult {
    return this.analysisService.analyzeArticle(input);
  }
}