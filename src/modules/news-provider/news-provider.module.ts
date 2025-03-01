import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { NewsProviderService } from './news-provider.service';
import { NewsProviderMapper } from './mapper/news-provider-mapper';
import { NewsProviderResolver } from './news-provider.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NewsProvider])],
  exports: [NewsProviderService],
  providers: [NewsProviderService, NewsProviderMapper, NewsProviderResolver],
})
export class NewsProviderModule {}
