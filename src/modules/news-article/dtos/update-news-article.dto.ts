import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsDate, IsArray, IsBoolean } from 'class-validator';

@InputType()
export class UpdateNewsArticleDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

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

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isProcessed?: boolean;
}