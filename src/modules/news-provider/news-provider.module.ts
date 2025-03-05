import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { NewsProviderService } from './news-provider.service';
import { NewsProviderResolver } from './news-provider.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NewsProvider])],
  exports: [NewsProviderService],
  providers: [NewsProviderService, NewsProviderResolver],
})
export class NewsProviderModule {}
