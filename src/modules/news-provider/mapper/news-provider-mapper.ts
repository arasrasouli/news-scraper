import { Injectable } from '@nestjs/common';
import { BaseMapper } from '../../base/mapper/base.mapper';
import { NewsProvider } from '../../../database/entities/newsProvider.entity';
import { NewsProviderResponseDto } from '../dtos/news-provider-response.dto';

@Injectable()
export class NewsProviderMapper extends BaseMapper<
  NewsProvider,
  NewsProviderResponseDto
> {
  toDto(entity: NewsProvider): NewsProviderResponseDto {
    const dto = super.toDto(entity);

    dto.name = entity.name;
    dto.url = entity.url;

    return dto;
  }

  fromDto(dto: NewsProviderResponseDto): NewsProvider {
    const entity = super.fromDto(dto);

    entity.name = dto.name;
    entity.url = dto.url;

    return entity;
  }
}
