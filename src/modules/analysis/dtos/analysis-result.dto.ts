import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum BiasLabel {
  Positive = 'positive',
  Negative = 'negative',
  Irrelevant = 'irrelevant',
}

registerEnumType(BiasLabel, { name: 'BiasLabel' });

@ObjectType()
export class AnalysisResult {
  @Field()
  topic: string;

  @Field(() => [String])
  hashtags: string[];

  @Field(() => BiasLabel)
  bias: BiasLabel;
}

