import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AllUsersShimmer: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl px-5 w-3/4 mx-auto mt-10">
      {/* Title Shimmer */}
      <div className="text-center pt-5 mb-8">
        <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>

      {/* Table Shimmer */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </TableHead>
            <TableHead>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-right">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse ml-auto"></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse ml-auto"></div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsersShimmer;