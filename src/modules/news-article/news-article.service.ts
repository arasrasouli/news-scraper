import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { NewsArticle } from 'src/database/entities/news-article.entity';


@Injectable()
export class NewsArticleService extends BaseService<NewsArticle> {
  constructor(
    @InjectRepository(NewsArticle)
    private readonly articleRepo: Repository<NewsArticle>,
  ) {
    super(articleRepo);
  }
}