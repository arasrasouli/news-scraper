import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common.entity';

@ObjectType()
@Entity()
export class NewsProvider extends CommonEntity {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  url: string;
}
