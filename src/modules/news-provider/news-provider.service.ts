import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { IBaseService } from '../base/interface.base.service';
import { BaseService } from '../base/base.service';
import { NewsProviderMapper } from './mapper/news-provider-mapper';
import { NewsProviderResponseDto } from './dtos/news-provider-response.dto';

@Injectable()
export class NewsProviderService extends BaseService<NewsProvider, NewsProviderResponseDto> 
  implements IBaseService<NewsProvider> {

  constructor(
    @InjectRepository(NewsProvider) private readonly newsProviderRepo: Repository<NewsProvider>,
    private readonly newsProviderMapper: NewsProviderMapper
  ) {
    super(newsProviderRepo, newsProviderMapper);
  }
}
