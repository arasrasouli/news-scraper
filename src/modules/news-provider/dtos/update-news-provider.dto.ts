import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNewsProviderDto } from './create-news-provider.dto';

@InputType()
export class UpdateNewsProviderDto extends PartialType(CreateNewsProviderDto) {}