export type SliceData<T> = {
  data: T;
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
};

export type PageData<T> = {
  data: T;
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};
