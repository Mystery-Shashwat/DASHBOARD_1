"use client"

import React from 'react'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Activity, 
  CreditCard, 
  IndianRupee,
} from 'lucide-react'

const Dashboard = () => {
  
  const metrics = {
    revenue: {
      current: 1250000,
      previous: 1000000,
      growth: 25
    },
    profit: {
      current: 450000,
      previous: 400000,
      growth: 12.5
    },
    transactions: {
      count: 15234,
      value: 890000,
      growth: 8
    },
    users: {
      active: 45000,
      new: 1200,
      churn: 2.5,
      growth:5
    }
  }

  const revenueData = [
    { name: 'Jan', value: 1000000 },
    { name: 'Feb', value: 1100000 },
    { name: 'Mar', value: 950000 },
    { name: 'Apr', value: 1250000 }
  ]

  const revenueBreakdown = [
    { name: 'Transaction Fees', value: 400000 },
    { name: 'Subscriptions', value: 300000 },
    { name: 'Interest', value: 250000 },
    { name: 'Other', value: 100000 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  type MetricCardProps = {
    title: string;
    value: number;
    previousValue?: number;
    growth: number;
    icon: React.ComponentType<{ className?: string }>;
  };

  const MetricCard: React.FC<MetricCardProps> = ({ title, value, growth, icon: Icon }) => (
    <Card className="flex-1">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              ₹{new Intl.NumberFormat().format(value)}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          {growth > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(growth)}%
          </span>
          <span className="text-sm text-muted-foreground">vs previous period</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-screen overflow-y-auto">
      <div className="container mx-auto p-6">
        <div className="space-y-8">
          {/* Top Metrics */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue"
              value={metrics.revenue.current}
              previousValue={metrics.revenue.previous}
              growth={metrics.revenue.growth}
              icon={IndianRupee}
            />
            <MetricCard
              title="Net Profit"
              value={metrics.profit.current}
              previousValue={metrics.profit.previous}
              growth={metrics.profit.growth}
              icon={CreditCard}
            />
            <MetricCard
              title="Active Users"
              value={metrics.users.active}
              growth={metrics.users.growth}
              icon={Users}
            />
            <MetricCard
              title="Total Transactions"
              value={metrics.transactions.value}
              growth={metrics.transactions.growth}
              icon={Activity}
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard