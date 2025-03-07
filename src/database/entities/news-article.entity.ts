import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { CommonEntity } from './common.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { NewsProvider } from './news-provider.entity';
import { Topic } from './topic.entity';

@ObjectType()
@Entity()
export class NewsArticle extends CommonEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ unique: true })
  url: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  publishedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @ManyToOne(() => NewsProvider, (newsProvider) => newsProvider.newsArticles)
  @JoinColumn({ name: 'newsProviderId' })
  @Field(() => NewsProvider)
  newsProvider: NewsProvider;

  @Field()
  @Column({ type: 'uuid' })
  newsProviderId: string;

  @ManyToMany(() => Topic, (topic) => topic.newsArticles)
  @JoinTable()
  @Field(() => [Topic], { nullable: true })
  topics?: Topic[];
}