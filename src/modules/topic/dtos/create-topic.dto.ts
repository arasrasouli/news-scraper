import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateTopicDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}