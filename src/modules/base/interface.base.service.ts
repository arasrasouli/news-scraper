export interface IBaseService<T> {
  create(dto: any): Promise<T>;
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, dto: any): Promise<T>;
  delete(id: string): Promise<boolean>;
}
