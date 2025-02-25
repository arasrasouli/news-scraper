import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { NewsProviderService } from './newsProvider.service';
import { NewsProviderResolver } from './newsProvider.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NewsProvider])],
  providers: [NewsProviderService, NewsProviderResolver],
  exports: [NewsProviderService],
})
export class NewsProviderModule {}
