import { Pagination } from '../pagination';

export interface ProductFindQuery extends Pagination {
  name?: string;
}
