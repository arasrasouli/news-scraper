import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonDTO {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Date)
  createDate: Date;

  @Field(() => Date)
  modifyDate: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}