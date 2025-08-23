import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AnalyzeArticleInput {
  @Field()
  link: string;

  @Field()
  title: string;

  @Field()
  bias: string;
}