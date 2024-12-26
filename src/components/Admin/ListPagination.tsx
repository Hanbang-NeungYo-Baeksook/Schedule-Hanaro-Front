import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

function ListPagination({
  firstPage,
  totalPage,
  currentPage,
  setCurrentPage,
  onPrev,
  onNext,
}: {
  firstPage: number;
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrev} />
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (firstPage) {
                  setCurrentPage(i + 1);
                } else {
                  setCurrentPage(i);
                }
              }}
              isActive={currentPage === i}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={onNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ListPagination;
