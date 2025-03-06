import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNewsPatternDto } from './create-news-pattern.dto';

@InputType()
export class UpdateNewsPatternDto extends PartialType(CreateNewsPatternDto) {}
