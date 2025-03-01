import { Repository, ObjectLiteral } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IBaseMapper } from './mapper/base.mapper.interface';

@Injectable()
export class BaseService<T extends ObjectLiteral, DTO> {
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly mapper: IBaseMapper<T, DTO>,
  ) { }

  async findAll(): Promise<DTO[]> {
    const entities = await this.repo.find();
    return entities.map<DTO>((entity) => this.mapper.toDto(entity));
  }

  async findOne(id: string): Promise<DTO> {
    const entity = await this.repo.findOne({ where: { id } } as any);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return this.mapper.toDto(entity);
  }

  async create(dto: DTO): Promise<DTO> {
    const entity = this.repo.create(this.mapper.fromDto(dto));
    const savedEntity = await this.repo.save(entity);
    return this.mapper.toDto(savedEntity);
  }

  async update(id: string, dto: Partial<DTO>): Promise<DTO> {
    const entityData = this.mapper.fromDto(dto as DTO);
    const updateResult = await this.repo.update(id, entityData);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected !== 0;
  }
}
