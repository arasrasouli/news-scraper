import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AnalysisService } from './analysis.service';
import { AnalysisResult } from './dtos/analysis-result.dto';

@Resolver()
export class AnalysisResolver {
  constructor(private readonly analysisService: AnalysisService) {}

  @Query(() => AnalysisResult)
  @UseGuards(JwtAuthGuard)
  async analyzeLink(@Args('url') url: string): Promise<AnalysisResult> {
    return this.analysisService.analyzeUrl(url);
  }
}

