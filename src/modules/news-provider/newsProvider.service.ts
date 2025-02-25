import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsProvider } from '../../database/entities/newsProvider.entity';

@Injectable()
export class NewsProviderService {
  constructor(
    @InjectRepository(NewsProvider) private repo: Repository<NewsProvider>,
  ) {}

  async create(name: string, url: string): Promise<NewsProvider> {
    const website = this.repo.create({ name, url });
    return this.repo.save(website);
  }

  async findAll(): Promise<NewsProvider[]> {
    return this.repo.find();
  }
}
