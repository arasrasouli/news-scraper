import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { CommonEntity } from './common.entity';
import { NewsProvider } from './news-provider.entity';

@Entity()
@ObjectType()
export class NewsPattern extends CommonEntity {
  @Column()
  @Field()
  columnSelector: string;

  @Column()
  @Field()
  titleSelector: string;

  @Column()
  @Field()
  linkSelector: string;

  @ManyToOne(() => NewsProvider, (newsProvider) => newsProvider.newsPatterns)
  @JoinColumn({ name: 'newsProviderId' })
  @Field(() => NewsProvider)
  newsProvider: NewsProvider;

  @Column({ type: 'uuid' })
  @Field()
  newsProviderId: string;
}