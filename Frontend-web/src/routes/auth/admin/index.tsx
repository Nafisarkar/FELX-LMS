import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import type { Tquiz } from "@/types/quiz";

export const Route = createFileRoute("/auth/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<Tquiz[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function getData(page: number) {
    const response = await api.get("/item/", {
      params: {
        page: page,
        perpage: 10,
      },
    });
    return response;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(currentPage);
        setData(response.data.items || []);
        setTotalPages(response.data.totalPages);
        console.log("Fetched page:", currentPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <Table className="border my-4 rounded-md ">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="text-left">Question</TableHead>
            <TableHead className="text-center">Option 1</TableHead>
            <TableHead className="text-center">Option 2</TableHead>
            <TableHead className="text-center">Option 3</TableHead>
            <TableHead className="text-center">Option 4</TableHead>
            <TableHead className="text-center">Answer Index</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: Tquiz) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item._id}</TableCell>
              <TableCell>{item.question}</TableCell>
              <TableCell className="text-center">{item.options[0]}</TableCell>
              <TableCell className="text-center">{item.options[1]}</TableCell>
              <TableCell className="text-center">{item.options[2]}</TableCell>
              <TableCell className="text-center">{item.options[3]}</TableCell>
              <TableCell className="text-center">{item.answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="py-4 justify-start">
        <PaginationContent>
          <PaginationItem>
            {/* Disable Previous if on Page 1 */}
            <PaginationPrevious
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>

          {/* Only show ellipsis if there are many pages */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            {/* Disable Next if on Last Page */}
            <PaginationNext
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
