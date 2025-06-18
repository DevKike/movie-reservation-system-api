export interface IPaginationQuery {
  page: number;
  limit: number;
}

export interface IPaginationRes extends IPaginationQuery {
  skip: number;
  totalPages: number;
}
