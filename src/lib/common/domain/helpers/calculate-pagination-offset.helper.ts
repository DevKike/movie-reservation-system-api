import {
  IPaginationQuery,
  IPaginationRes,
} from '../interfaces/query/pagination-query.interface';

export const calculatePaginationOffset = (
  query: IPaginationQuery,
  totalRecords: number,
): IPaginationRes => {
  const { page, limit, order } = query;

  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalRecords / limit);

  return { skip, totalPages, page, limit, order };
};
