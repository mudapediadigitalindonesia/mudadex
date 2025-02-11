import React, { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}

const PaginationLoop = ({ totalPages, currentPage, onPageChange }: Props) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <PaginationItem key={i}>
            <Button
              variant={currentPage === i ? "default" : "outline"}
              size="sm"
              className="w-fit sm:text-xs md:text-sm"
              onClick={() => handlePageChange(i)}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - 1, 1);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3;
        for (let i = 1; i <= leftItemCount; i++) {
          pageButtons.push(
            <PaginationItem key={i}>
              <Button
                variant={currentPage === i ? "default" : "ghost"}
                size="sm"
                className="w-fit sm:text-xs md:text-sm"
                onClick={() => handlePageChange(i)}
              >
                {i}
              </Button>
            </PaginationItem>
          );
        }
        pageButtons.push(
          <PaginationItem key="leftDots">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pageButtons.push(
          <PaginationItem key={totalPages}>
            <Button
              variant={currentPage === totalPages ? "default" : "ghost"}
              size="sm"
              className="w-fit sm:text-xs md:text-sm"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </PaginationItem>
        );
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pageButtons.push(
          <PaginationItem key={1}>
            <Button
              variant={currentPage === 1 ? "default" : "ghost"}
              size="sm"
              className="w-fit sm:text-xs md:text-sm"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
          </PaginationItem>
        );
        pageButtons.push(
          <PaginationItem key="rightDots">
            <PaginationEllipsis />
          </PaginationItem>
        );
        const rightItemCount = 3;
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          pageButtons.push(
            <PaginationItem key={i}>
              <Button
                variant={currentPage === i ? "default" : "ghost"}
                size="sm"
                className="w-fit sm:text-xs md:text-sm"
                onClick={() => handlePageChange(i)}
              >
                {i}
              </Button>
            </PaginationItem>
          );
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pageButtons.push(
          <PaginationItem key={1}>
            <Button
              variant={currentPage === 1 ? "default" : "ghost"}
              size="sm"
              className="w-fit sm:text-xs md:text-sm"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
          </PaginationItem>
        );
        pageButtons.push(
          <PaginationItem key="leftDots">
            <PaginationEllipsis />
          </PaginationItem>
        );
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pageButtons.push(
            <PaginationItem key={i}>
              <Button
                variant={currentPage === i ? "default" : "ghost"}
                size="sm"
                className="w-fit sm:text-xs md:text-sm"
                onClick={() => handlePageChange(i)}
              >
                {i}
              </Button>
            </PaginationItem>
          );
        }
        pageButtons.push(
          <PaginationItem key="rightDots">
            <PaginationEllipsis />
          </PaginationItem>
        );
        pageButtons.push(
          <PaginationItem key={totalPages}>
            <Button
              variant={currentPage === totalPages ? "default" : "ghost"}
              size="sm"
              className="w-fit sm:text-xs md:text-sm"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </PaginationItem>
        );
      }
    }

    return pageButtons;
  };

  return (
    <Pagination>
      <PaginationContent className="space-x-2 sm:space-x-1 md:space-x-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className="cursor-pointer text-xs"
          />
        </PaginationItem>
        {renderPageButtons()}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className="cursor-pointer text-xs"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationLoop;
