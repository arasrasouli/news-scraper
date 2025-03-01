import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsProviderService } from './newsProvider.service';
import { NewsProvider } from '../../database/entities/newsProvider.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Resolver(() => NewsProvider)
export class NewsProviderResolver {
  constructor(private newsProviderService: NewsProviderService) {}

  @Query(() => NewsProvider)
  @UseGuards(JwtAuthGuard)
  async getNewsProvider(@Args('id') id: string) {
    return this.newsProviderService.findOne(id);
  }
  
  @Query(() => [NewsProvider])
  @UseGuards(JwtAuthGuard) 
  async getNewsProviders() {
    return this.newsProviderService.findAll();
  }

  @Mutation(() => NewsProvider)
  @UseGuards(JwtAuthGuard)  
  async createNewsProvider(@Args('name') name: string, @Args('url') url: string) {
    const data = new NewsProvider();
    data.name = name;
    data.url = url;
    return this.newsProviderService.create(data);
  }

  @Mutation(() => NewsProvider)
  @UseGuards(JwtAuthGuard)  
  async updateNewsProvider(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('url') url: string,
  ) {
    const data = new NewsProvider();
    data.name = name;
    data.url = url;
    return this.newsProviderService.update(id, data);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)  
  async deleteNewsProvider(@Args('id') id: string) {
    return this.newsProviderService.delete(id);
  }
}
