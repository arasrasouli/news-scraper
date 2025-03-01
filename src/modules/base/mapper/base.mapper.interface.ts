export interface IBaseMapper<T, DTO> {
  toDto(entity: T): DTO;
  fromDto(dto: DTO): T;
}
