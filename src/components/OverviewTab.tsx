import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate, getStatusIcon } from './utils';

interface FinancialDocument {
  id: string;
  title: string;
  type: 'statement' | 'invoice' | 'report' | 'receipt';
  date: string;
  transactions: Array<{
    id: string;
    date: string;
    amount: number;
    description: string;
    category: string;
    status: 'pending' | 'completed' | 'failed';
    reference?: string;
  }>;
  totalAmount: number;
  createdBy?: { name: string; avatar?: string };
  lastUpdated?: string;
  currency: string;
  period?: { from: string; to: string };
  notes?: string;
}

interface OverviewTabProps {
  document: FinancialDocument;
  setActiveTab: (tab: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ document, setActiveTab }) => {
  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
              Document Type
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold capitalize">{document.type}</p>
            {document.period && (
              <p className="text-sm text-gray-500 mt-1">
                Period: {formatDate(document.period.from)} - {formatDate(document.period.to)}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-bold">
              {document.lastUpdated ? new Date(document.lastUpdated).toLocaleDateString() : new Date(document.date).toLocaleDateString()}
            </p>
            {document.createdBy && (
              <div className="flex items-center mt-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={document.createdBy.avatar} alt={document.createdBy.name} />
                  <AvatarFallback>{document.createdBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{document.createdBy.name}</span>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
              Total Amount
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <p className={`text-2xl font-bold ${document.totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(document.totalAmount, document.currency)}
            </p>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className={document.totalAmount >= 0 ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}>
                {document.totalAmount >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Net Positive
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    Net Negative
                  </>
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <Button variant="outline" size="sm" onClick={() => setActiveTab('transactions')}>
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {document.transactions.slice(0, 3).map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.description}
                    <div className="text-xs text-gray-500">Ref: {transaction.reference}</div>
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(transaction.amount, document.currency)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {getStatusIcon(transaction.status)}
                      <span className="capitalize text-sm">{transaction.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      {document.notes && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Notes</h3>
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <p>{document.notes}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;