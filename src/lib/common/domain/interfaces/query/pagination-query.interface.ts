import { ORDER } from 'src/common/enums/order.enum';

export interface IPaginationQuery {
  page: number;
  limit: number;
  order: ORDER;
}

export interface IPaginationRes extends Omit<IPaginationQuery, 'order'> {
  skip: number;
  totalPages: number;
}
