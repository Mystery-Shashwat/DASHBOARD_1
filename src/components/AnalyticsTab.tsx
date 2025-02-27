import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency, formatDate, getStatusColor } from './utils';

interface FinancialDocument {
  transactions: Array<{ id: string; date: string; amount: number; description: string; category: string; status: 'pending' | 'completed' | 'failed' }>;
  currency: string;
  lastUpdated?: string;
  date: string;
  status: string;
}

interface AnalyticsSummary {
  monthlySpending: number[];
  categoryBreakdown: { category: string; amount: number; percentage: number }[];
  complianceScore: number;
  pendingActions: number;
}

interface AnalyticsTabProps {
  document: FinancialDocument;
  analytics: AnalyticsSummary;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ document, analytics }) => {
  const monthlySpendingData = analytics.monthlySpending.map((amount, index) => ({
    month: `Month ${index + 1}`,
    spending: amount,
  }));

  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Category distribution of expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.categoryBreakdown.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{category.category}</span>
                    <span className="text-sm font-medium">{category.percentage}%</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {formatCurrency(category.amount, document.currency)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Compliance & Status</CardTitle>
            <CardDescription>Document verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Compliance Score</span>
                  <span className="text-sm font-medium">{analytics.complianceScore}/100</span>
                </div>
                <Progress
                  value={analytics.complianceScore}
                  className={`h-2 ${analytics.complianceScore > 80 ? 'bg-green-600' : 'bg-yellow-600'}`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {analytics.complianceScore > 90 ? 'Excellent compliance status' : 'Good compliance status, review recommended'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Status Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Pending Actions</p>
                    <p className="text-lg font-bold">{analytics.pendingActions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transactions</p>
                    <p className="text-lg font-bold">{document.transactions.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <p className="text-sm font-medium">{formatDate(document.lastUpdated || document.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge className={getStatusColor(document.status)}>
                      {document.status.replace('_', ' ').charAt(0).toUpperCase() + document.status.replace('_', ' ').slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>Spending over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart width={600} height={300} data={monthlySpendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="spending" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;