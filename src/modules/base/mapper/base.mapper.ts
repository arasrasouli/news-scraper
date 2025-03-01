import { IBaseMapper } from './base.mapper.interface';
import { CommonEntity } from '../../../database/entities/common.entity';
import { CommonDTO } from '../dtos/common.dto';

export class BaseMapper<T extends CommonEntity, DTO extends CommonDTO>
  implements IBaseMapper<T, DTO>
{
  toDto(entity: T): DTO {
    return {
      id: entity.id,
      isActive: entity.isActive,
      isDeleted: entity.isDeleted,
      createDate: entity.createDate,
      modifyDate: entity.modifyDate,
      deletedAt: entity.deletedAt || null,
    } as unknown as DTO;
  }

  fromDto(dto: DTO): T {
    return {
      id: dto.id,
      isActive: dto.isActive,
      isDeleted: dto.isDeleted,
      createDate: dto.createDate,
      modifyDate: dto.modifyDate,
      deletedAt: dto.deletedAt || null,
    } as unknown as T;
  }
}
