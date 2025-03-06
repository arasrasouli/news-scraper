import { Module } from '@nestjs/common';
import { NewsPatternService } from './news-pattern.service';
import { NewsPatternResolver } from './news-pattern.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsPattern } from '../../database/entities/news-pattern.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPattern])],
  providers: [NewsPatternResolver, NewsPatternService],
  exports: [NewsPatternService]
})
export class NewsPatternModule {}