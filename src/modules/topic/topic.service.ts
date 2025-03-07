import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../../database/entities/topic.entity';
import { BaseService } from '../base/base.service';


@Injectable()
export class TopicService extends BaseService<Topic> {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,
  ) {
    super(topicRepo);
  }
}