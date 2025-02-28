import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsProviderService } from './newsProvider.service';
import { NewsProvider } from '../../database/entities/newsProvider.entity';

@Resolver(() => NewsProvider)
export class NewsProviderResolver {
  constructor(private newsProviderService: NewsProviderService) {}

  @Query(() => NewsProvider)
  async getNewsProvider(@Args('id') id: string) {
    return this.newsProviderService.findOne(id);
  }
  
  @Query(() => [NewsProvider])
  async getNewsProviders() {
    return this.newsProviderService.findAll();
  }

  @Mutation(() => NewsProvider)
  async createNewsProvider(@Args('name') name: string, @Args('url') url: string) {
    const data = new NewsProvider();
    data.name = name;
    data.url = url;
    return this.newsProviderService.create(data);
  }

  @Mutation(() => NewsProvider)
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
  async deleteNewsProvider(@Args('id') id: string) {
    return this.newsProviderService.delete(id);
  }
}
