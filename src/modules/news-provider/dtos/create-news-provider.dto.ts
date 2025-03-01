import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CommonDTO } from '../../base/dtos/common.dto';

@InputType()
export class CreateNewsProviderDto extends CommonDTO {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  url: string;
}