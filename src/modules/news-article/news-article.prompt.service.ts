import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getAnalyzeSystemPrompt } from './news-article.prompts';

@Injectable()
export class NewsArticlePromptService {
  constructor(private readonly configService: ConfigService) {}

  getAnalyzeSystemPrompt(): string {
    const override = this.configService.get<string>('ANALYZE_SYSTEM_PROMPT');
    return getAnalyzeSystemPrompt(override);
  }
}