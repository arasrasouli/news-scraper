import { Module } from '@nestjs/common';
import { NewsArticleService } from './news-article.service';
import { NewsArticleResolver } from './news-article.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsArticle } from '../../database/entities/news-article.entity';
import { NewsAnalysisModule } from '../news-analysis/news-analysis.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsArticle]), NewsAnalysisModule],
  providers: [NewsArticleResolver, NewsArticleService],
  exports: [NewsArticleService],
})
export class NewsArticleModule {}