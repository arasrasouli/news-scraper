import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsProviderService } from './newsProvider.service';
import { NewsProvider } from '../../database/entities/newsProvider.entity';

@Resolver(() => NewsProvider)
export class NewsProviderResolver {
  constructor(private newsProviderService: NewsProviderService) {}

  @Query(() => [NewsProvider])
  async getNewsProviders() {
    return this.newsProviderService.findAll();
  }

  @Mutation(() => NewsProvider)
  async addNewsProvider(@Args('name') name: string, @Args('url') url: string) {
    return this.newsProviderService.create(name, url);
  }
}
