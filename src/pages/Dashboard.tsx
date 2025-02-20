"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-30", desktop: 300, mobile: 250 },
  { date: "2024-05-01", desktop: 350, mobile: 300 },
  { date: "2024-05-30", desktop: 400, mobile: 350 },
  { date: "2025-05-01", desktop: 1500, mobile: 1450 },
  { date: "2025-05-30", desktop: 1550, mobile: 1500 },
  { date: "2024-06-01", desktop: 420, mobile: 380 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
  { date: "2024-07-01", desktop: 500, mobile: 450 },
  { date: "2024-07-30", desktop: 550, mobile: 500 },
  { date: "2024-12-30", desktop: 1050, mobile: 1000 },
  { date: "2025-01-01", desktop: 1100, mobile: 1050 },
  { date: "2025-01-30", desktop: 1150, mobile: 1100 },
  { date: "2025-02-01", desktop: 1200, mobile: 1150 },
  { date: "2025-02-28", desktop: 1250, mobile: 1200 },
  { date: "2025-03-01", desktop: 1300, mobile: 1250 },
  { date: "2025-03-30", desktop: 1350, mobile: 1300 },
  { date: "2025-04-01", desktop: 1400, mobile: 1350 },
  
  { date: "2024-08-01", desktop: 600, mobile: 550 },
  { date: "2024-08-30", desktop: 650, mobile: 600 },
  { date: "2024-09-01", desktop: 700, mobile: 650 },
  { date: "2024-09-30", desktop: 750, mobile: 700 },
  { date: "2024-10-01", desktop: 800, mobile: 750 },
  { date: "2024-10-30", desktop: 850, mobile: 800 },
  { date: "2024-11-01", desktop: 900, mobile: 850 },
  { date: "2025-04-30", desktop: 1450, mobile: 1400 },
  
  { date: "2025-06-01", desktop: 1600, mobile: 1550 },
  { date: "2025-06-30", desktop: 1650, mobile: 1600 },
  { date: "2024-11-30", desktop: 950, mobile: 900 },
  { date: "2024-12-01", desktop: 1000, mobile: 950 },

  
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--foreground))", 
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--primary))", 
  },
} satisfies ChartConfig

const Dashboard = () => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" /> 
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar 
              dataKey={activeChart} 
              fill={chartConfig[activeChart].color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Dashboard