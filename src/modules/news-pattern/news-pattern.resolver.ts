import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsPatternService } from './news-pattern.service';
import { NewsPattern } from '../../database/entities/news-pattern.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'; 
import { CreateNewsPatternDto } from './dtos/create-news-pattern.dto';
import { UpdateNewsPatternDto } from './dtos/update-news-pattern.dto';

@Resolver(() => NewsPattern)
export class NewsPatternResolver {
  constructor(private readonly newsPatternService: NewsPatternService) {}

  @Query(() => NewsPattern)
  @UseGuards(JwtAuthGuard)
  async getNewsPattern(@Args('id') id: string) {
    return this.newsPatternService.findOne(id);
  }

  @Query(() => [NewsPattern])
  @UseGuards(JwtAuthGuard)
  async getNewsPatterns() {
    return this.newsPatternService.findAll();
  }

  @Mutation(() => NewsPattern)
  @UseGuards(JwtAuthGuard)
  async createNewsPattern(
    @Args('createNewsPatternDto') createNewsPatternDto: CreateNewsPatternDto,
  ): Promise<NewsPattern> {
    return this.newsPatternService.create(createNewsPatternDto);
  }

  @Mutation(() => NewsPattern)
  @UseGuards(JwtAuthGuard)
  async updateNewsPattern(
    @Args('id') id: string,
    @Args('updateNewsPatternDto') updateNewsPatternDto: UpdateNewsPatternDto,
  ) {
    return this.newsPatternService.update(id, updateNewsPatternDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteNewsPattern(@Args('id') id: string) {
    return this.newsPatternService.delete(id);
  }
}