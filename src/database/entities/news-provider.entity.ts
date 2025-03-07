import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { NewsPattern } from './news-pattern.entity';
import { NewsArticle } from './news-article.entity';

@ObjectType()
@Entity()
export class NewsProvider extends CommonEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  url: string;

  @OneToMany(() => NewsPattern, (newsPattern) => newsPattern.newsProvider)
  @Field(() => [NewsPattern], {
    nullable: true,
    description: 'List of news patterns',
  })

  @OneToMany(() => NewsArticle, (newsArticle) => newsArticle.newsProvider)
  @Field(() => [NewsArticle], {
    nullable: true,
    description: 'List of news articles',
  })
  newsPatterns: NewsPattern[];
  newsArticles: NewsArticle[];
}