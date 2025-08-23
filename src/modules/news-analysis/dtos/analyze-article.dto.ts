import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';

@InputType()
export class AnalyzeArticleInputDto {
  @Field()
  @IsString()
  link: string;

  @Field()
  @IsString()
  @MaxLength(300)
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  bias: string;
}

@ObjectType()
export class AnalyzeArticleResultDto {
  @Field()
  topic: string;

  @Field(() => [String])
  hashtags: string[];

  @Field()
  biasDirection: 'positive' | 'negative' | 'irrelevant';

  @Field({ nullable: true })
  @IsOptional()
  summary?: string;
}