import { Repository, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<T | null> {
    return this.repo.findOne({ where: { id } } as any);
  }

  async create(data: T): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.repo.update(id, data);
    return this.findOne(id) as Promise<T>;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
