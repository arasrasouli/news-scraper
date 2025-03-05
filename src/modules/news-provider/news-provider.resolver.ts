import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsProviderService } from './news-provider.service';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateNewsProviderDto } from './dtos/update-news-provider.dto';
import { CreateNewsProviderDto } from './dtos/create-news-provider.dto';

@Resolver(() => NewsProvider)
export class NewsProviderResolver {
  constructor(private newsProviderService: NewsProviderService) {}

  @Query(() => NewsProvider, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getNewsProvider(@Args('id') id: string): Promise<NewsProvider | null> {
    return this.newsProviderService.findOne(id);
  }

  @Query(() => [NewsProvider])
  @UseGuards(JwtAuthGuard)
  async getNewsProviders(): Promise<NewsProvider[]> {
    return this.newsProviderService.findAll();
  }

  @Mutation(() => NewsProvider)
  @UseGuards(JwtAuthGuard)
  async createNewsProvider(
    @Args('createNewsProviderDto') createNewsProviderDto: CreateNewsProviderDto,
  ): Promise<NewsProvider> {
    return this.newsProviderService.create(createNewsProviderDto);
  }

  @Mutation(() => NewsProvider)
  @UseGuards(JwtAuthGuard)
  async updateNewsProvider(
    @Args('id') id: string,
    @Args('updateNewsProviderDto') updateNewsProviderDto: UpdateNewsProviderDto,
  ): Promise<NewsProvider> {
    return this.newsProviderService.update(id, updateNewsProviderDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteNewsProvider(@Args('id') id: string): Promise<boolean> {
    return this.newsProviderService.delete(id);
  }
}