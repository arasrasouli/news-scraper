import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsProviderService } from './news-provider.service';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateNewsProviderDto } from './dtos/update-news-provider.dto';
import { CreateNewsProviderDto } from './dtos/create-news-provider.dto';
import { NewsProviderResponseDto } from './dtos/news-provider-response.dto';

@Resolver(() => NewsProvider)
export class NewsProviderResolver {
  constructor(private newsProviderService: NewsProviderService) {}

  @Query(() => NewsProviderResponseDto)
  @UseGuards(JwtAuthGuard)
  async getNewsProvider(@Args('id') id: string): Promise<NewsProviderResponseDto> {
    return this.newsProviderService.findOne(id);
  }

  @Query(() => [NewsProviderResponseDto])
  @UseGuards(JwtAuthGuard)
  async getNewsProviders(): Promise<NewsProviderResponseDto[]> {
    return this.newsProviderService.findAll();
  }

  @Mutation(() => NewsProviderResponseDto)
  @UseGuards(JwtAuthGuard)  
  async createNewsProvider(@Args('createNewsProviderDto') createNewsProviderDto: CreateNewsProviderDto) {
    return this.newsProviderService.create(createNewsProviderDto);
  }

  @Mutation(() => NewsProviderResponseDto)
  @UseGuards(JwtAuthGuard)  
  async updateNewsProvider(
    @Args('id') id: string,
    @Args('updateNewsProviderDto') updateNewsProviderDto: UpdateNewsProviderDto,
  ) {
    return this.newsProviderService.update(id, updateNewsProviderDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)  
  async deleteNewsProvider(@Args('id') id: string) {
    return this.newsProviderService.delete(id);
  }
}
