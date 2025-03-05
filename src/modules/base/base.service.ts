import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IBaseService } from './interface.base.service';

@Injectable()
export class BaseService<T extends ObjectLiteral> implements IBaseService<T> {
  constructor(protected readonly repo: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<T | null> {
    const entity = await this.repo.findOne({
      where: { id: id } as unknown as Partial<T>,
    });
    return entity || null;
  }

  async create(dto: any): Promise<T> {
    const entity = this.repo.create(dto as DeepPartial<T>);
    return this.repo.save(entity);
  }

  async update(id: string, dto: any): Promise<T> {
    const updateResult = await this.repo.update(id, dto as Partial<T>);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    const updatedEntity = await this.findOne(id);
    if (!updatedEntity) {
      throw new NotFoundException(`Entity with ID ${id} not found after update`);
    }
    return updatedEntity;
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected !== 0;
  }
}