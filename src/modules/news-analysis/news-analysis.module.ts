import { Module } from '@nestjs/common';
import { NewsAnalysisService } from './news-analysis.service';
import { NewsAnalysisPromptService } from './news-analysis.prompt.service';

@Module({
  providers: [NewsAnalysisService, NewsAnalysisPromptService],
  exports: [NewsAnalysisService, NewsAnalysisPromptService],
})
export class NewsAnalysisModule {}