import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../../database/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicResolver, TopicService],
  exports: [TopicService],
})
export class TopicModule {}