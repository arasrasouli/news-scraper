import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateNewsPatternDto {
  @Field({ description: 'CSS selector for the news column' })
  @IsString()
  @IsNotEmpty()
  columnSelector: string;

  @Field({ description: 'CSS selector for news item titles' })
  @IsString()
  @IsNotEmpty()
  titleSelector: string;

  @Field({ description: 'CSS selector for news item links' })
  @IsString()
  @IsNotEmpty()
  linkSelector: string;

  @Field({ description: 'UUID of the associated NewsProvider' })
  @IsUUID()
  @IsNotEmpty()
  newsProviderId: string;
}
