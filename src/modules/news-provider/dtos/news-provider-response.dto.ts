import { Field, ObjectType } from '@nestjs/graphql';
import { CommonDTO } from '../../base/dtos/common.dto';

@ObjectType()
export class NewsProviderResponseDto extends CommonDTO {
  @Field(() => String)
  name: string;

  @Field(() => String)
  url: string;
}