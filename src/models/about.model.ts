import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AboutModel {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  version: string;
}
