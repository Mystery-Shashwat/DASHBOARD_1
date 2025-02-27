"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const RecentShimmer = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards Shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Main Transactions Card Shimmer */}
      <Card className="w-full">
        <CardHeader>
          <div className="space-y-2">
            <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Filters Shimmer */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardHeader>

        {/* Table Shimmer */}
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <th key={index} className="p-4">
                          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill(0)
                    .map((_, rowIndex) => (
                      <tr key={rowIndex} className="border-b">
                        {Array(5)
                          .fill(0)
                          .map((_, cellIndex) => (
                            <td key={cellIndex} className="p-4">
                              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentShimmer;