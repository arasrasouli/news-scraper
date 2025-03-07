import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TopicService } from './topic.service';
import { Topic } from '../../database/entities/topic.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';

@Resolver(() => Topic)
export class TopicResolver {
  constructor(private readonly topicService: TopicService) {}

  @Query(() => Topic)
  @UseGuards(JwtAuthGuard)
  async getTopic(@Args('id') id: string): Promise<Topic> {
    const topic = await this.topicService.findOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  @Query(() => [Topic])
  @UseGuards(JwtAuthGuard)
  async getTopics(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Mutation(() => Topic)
  @UseGuards(JwtAuthGuard)
  async createTopic(
    @Args('createTopicDto') createTopicDto: CreateTopicDto,
  ): Promise<Topic> {
    return this.topicService.create(createTopicDto);
  }

  @Mutation(() => Topic)
  @UseGuards(JwtAuthGuard)
  async updateTopic(
    @Args('id') id: string,
    @Args('updateTopicDto') updateTopicDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicService.update(id, updateTopicDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteTopic(@Args('id') id: string): Promise<boolean> {
    return this.topicService.delete(id);
  }
}
