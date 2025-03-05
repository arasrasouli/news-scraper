import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { IBaseService } from '../base/interface.base.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class NewsProviderService extends BaseService<NewsProvider> 
  implements IBaseService<NewsProvider> {

  constructor(
    @InjectRepository(NewsProvider) private readonly newsProviderRepo: Repository<NewsProvider>
  ) {
    super(newsProviderRepo);
  }
}
