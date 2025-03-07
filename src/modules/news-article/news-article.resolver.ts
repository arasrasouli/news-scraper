import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsArticleService } from './news-article.service';
import { NewsArticle } from '../../database/entities/news-article.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateNewsArticleDto } from './dtos/create-news-article.dto';
import { UpdateNewsArticleDto } from './dtos/update-news-article.dto';

@Resolver(() => NewsArticle)
export class NewsArticleResolver {
  constructor(private readonly newsArticleService: NewsArticleService) {}

  @Query(() => NewsArticle)
  @UseGuards(JwtAuthGuard)
  async getNewsArticle(@Args('id') id: string): Promise<NewsArticle> {
    const newsArticle = await this.newsArticleService.findOne(id);
    if (!newsArticle) {
      throw new NotFoundException(`NewsArticle with ID ${id} not found`);
    }
    return newsArticle;
  }

  @Query(() => [NewsArticle])
  @UseGuards(JwtAuthGuard)
  async getNewsArticles(): Promise<NewsArticle[]> {
    return this.newsArticleService.findAll();
  }

  @Mutation(() => NewsArticle)
  @UseGuards(JwtAuthGuard)
  async createNewsArticle(
    @Args('createNewsArticleDto') createNewsArticleDto: CreateNewsArticleDto,
  ): Promise<NewsArticle> {
    return this.newsArticleService.create(createNewsArticleDto);
  }

  @Mutation(() => NewsArticle)
  @UseGuards(JwtAuthGuard)
  async updateNewsArticle(
    @Args('id') id: string,
    @Args('updateNewsArticleDto') updateNewsArticleDto: UpdateNewsArticleDto,
  ): Promise<NewsArticle> {
    return this.newsArticleService.update(id, updateNewsArticleDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteNewsArticle(@Args('id') id: string): Promise<boolean> {
    return this.newsArticleService.delete(id);
  }
}