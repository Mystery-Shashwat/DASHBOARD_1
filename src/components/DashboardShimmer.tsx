"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardShimmer: React.FC  = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="space-y-8">
          {/* Top Metrics Shimmer */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="flex-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 w-full">
                        <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Charts Section Shimmer */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Revenue Trend Shimmer */}
            <Card className="w-full">
              <CardHeader>
                <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="h-full w-full bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown Shimmer */}
            <Card className="w-full">
              <CardHeader>
                <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="h-48 w-48 bg-gray-200 rounded-full animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardShimmer;
