import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsProviderService } from './news-provider.service';
import { NewsProvider } from '../../database/entities/news-provider.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateNewsProviderDto } from './dtos/update-news-provider.dto';
import { CreateNewsProviderDto } from './dtos/create-news-provider.dto';

@Resolver(() => NewsProvider)
export class NewsProviderResolver {
  constructor(private readonly newsProviderService: NewsProviderService) {}

  @Query(() => NewsProvider, { name: 'getNewsProvider' })
  @UseGuards(JwtAuthGuard)
  async getNewsProvider(@Args('id', { type: () => String }) id: string): Promise<NewsProvider> {
    const entity = await this.newsProviderService.findOne(id);
    if (!entity) {
      throw new NotFoundException(`NewsProvider with ID ${id} not found`);
    }
    return entity;
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