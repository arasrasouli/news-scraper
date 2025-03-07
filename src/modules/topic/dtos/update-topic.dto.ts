import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';
import { CreateTopicDto } from './create-topic.dto';

@InputType()
export class UpdateTopicDto extends CreateTopicDto {
  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  expireDate?: Date;
}