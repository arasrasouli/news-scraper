import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsPattern } from '../../database/entities/news-pattern.entity';
import { BaseService } from '../base/base.service';
import { IBaseService } from '../base/interface.base.service';

@Injectable()
export class NewsPatternService extends BaseService<NewsPattern> implements IBaseService<NewsPattern> {
  constructor(
    @InjectRepository(NewsPattern)
    private readonly newsPatternRepo: Repository<NewsPattern>,
  ) {
    super(newsPatternRepo);
  }
}