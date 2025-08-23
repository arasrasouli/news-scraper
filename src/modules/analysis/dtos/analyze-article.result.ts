import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AnalyzeArticleResult {
  @Field()
  topic: string;

  @Field(() => [String])
  hashtags: string[];

  @Field()
  biasDirection: 'positive' | 'negative' | 'irrelative';
}