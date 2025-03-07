import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsDate, IsArray } from 'class-validator';

@InputType()
export class CreateNewsArticleDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  summary?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  publishedAt?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @Field()
  @IsUUID()
  @IsNotEmpty()
  newsProviderId: string;
}