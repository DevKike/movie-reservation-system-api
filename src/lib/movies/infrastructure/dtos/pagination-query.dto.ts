import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, Min } from 'class-validator';
import { IPaginationQuery } from '../../../common/domain/interfaces/query/pagination-query.interface';
import { ORDER } from 'src/common/enums/order.enum';

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

  @IsOptional()
  @IsEnum(ORDER, { message: 'Order must be ASC or DESC' })
  @Transform(({ value }) => String(value).toUpperCase())
  order: ORDER = ORDER.DESC;
}
