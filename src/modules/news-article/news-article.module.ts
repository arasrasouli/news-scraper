import { Module } from '@nestjs/common';
import { NewsArticleService } from './news-article.service';
import { NewsArticleResolver } from './news-article.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsArticle } from '../../database/entities/news-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsArticle])],
  providers: [NewsArticleResolver, NewsArticleService],
  exports: [NewsArticleService],
})
export class NewsArticleModule {}