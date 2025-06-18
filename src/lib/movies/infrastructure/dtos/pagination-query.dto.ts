import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { IPaginationQuery } from '../../../common/domain/interfaces/query/pagination-query.interface';

export class PaginationQueryDTO implements IPaginationQuery {
  @IsOptional()
  @Transform(({ value }) => parseInt(String(value)) || 1)
  @IsPositive()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(String(value)) || 10)
  @IsPositive()
  @Min(1)
  limit: number = 10;
}
