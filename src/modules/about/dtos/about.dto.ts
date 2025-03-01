import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AboutDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  version: string;
}
