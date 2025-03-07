import { Field, ObjectType } from "@nestjs/graphql";
import { CommonEntity } from "./common.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { NewsArticle } from "./news-article.entity";

@ObjectType()
@Entity()
export class Topic extends CommonEntity {
  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  expireDate?: Date;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @ManyToMany(() => NewsArticle, (newsArticle) => newsArticle.topics)
  @Field(() => [NewsArticle], { nullable: true })
  newsArticles?: NewsArticle[];

  @Field()
  isValid(): boolean {
    const now = new Date();
    return this.expireDate ? now <= new Date(this.expireDate) : false;
  }
}