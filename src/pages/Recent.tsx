import  { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon,  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types remain the same
type TransactionStatus = "completed" | "pending" | "failed";
type TransactionType = "credit" | "debit";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
  recipient: string;
}

const recentTransactions: Transaction[] = [
  {
    id: "tx1",
    date: "2025-02-19",
    description: "Payment for Services",
    amount: 1250.00,
    status: "completed",
    type: "credit",
    recipient: "IDFC",
  },
  {
    id: "tx2",
    date: "2025-02-19",
    description: "Monthly Subscription",
    amount: 49.99,
    status: "pending",
    type: "debit",
    recipient: "Netflix",
  },
  {
    id: "tx3",
    date: "2025-02-18",
    description: "Streaming",
    amount: 156.78,
    status: "completed",
    type: "debit",
    recipient: "Hotstar",
  },
  {
    id: "tx4",
    date: "2025-02-18",
    description: "Salary",
    amount: 850.00,
    status: "completed",
    type: "credit",
    recipient: "Company",
  },
  {
    id: "tx5",
    date: "2025-02-17",
    description: "Failed Transfer",
    amount: 75.00,
    status: "failed",
    type: "debit",
    recipient: "Unknown",
  },
  {
    id: "tx6",
    date: "2025-01-17",
    description: "Bonus",
    amount: 75.00,
    status: "completed",
    type: "credit",
    recipient: "Company",
  },
];

const Recent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Calculate summary statistics
  const totalCredit = recentTransactions
    .filter(t => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebit = recentTransactions
    .filter(t => t.type === "debit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getStatusColor = (status: TransactionStatus): string => {
    const colors = {
      completed: "bg-green-500 hover:bg-green-600",
      pending: "bg-yellow-500 hover:bg-yellow-600",
      failed: "bg-red-500 hover:bg-red-600"
    };
    return colors[status];
  };

  // Filter transactions based on search term and filters
  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpIcon className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(totalCredit)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDownIcon className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(totalDebit)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {totalCredit - totalDebit >= 0 ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-500 mr-2" />
              )}
              <span className="text-2xl font-bold">{formatCurrency(totalCredit - totalDebit)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Transactions Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {recentTransactions.length} transactions
          </CardDescription>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.recipient}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "credit" ? 
                          <ArrowUpIcon className="w-4 h-4 text-green-500" /> : 
                          <ArrowDownIcon className="w-4 h-4 text-red-500" />
                        }
                        <span className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recent;