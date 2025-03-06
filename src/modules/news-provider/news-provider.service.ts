import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsProvider } from '../../database/entities/news-provider.entity';
import { IBaseService } from '../base/interface.base.service';
import { BaseService } from '../base/base.service';

@Injectable()
export class NewsProviderService extends BaseService<NewsProvider>
  implements IBaseService<NewsProvider> {

  constructor(
    @InjectRepository(NewsProvider)
    repo: Repository<NewsProvider>,
  ) {
    super(repo);
  }

  async findOne(id: string): Promise<NewsProvider | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['newsPatterns'],
    });
  }
}
