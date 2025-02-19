import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

// Define types for our transaction data
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
];

const Recent = () => {
  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Function to get status badge color
  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent</CardTitle>
      </CardHeader>
      <CardContent>
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
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.recipient}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {transaction.type === "credit" ? 
                    <ArrowUpIcon className="w-4 h-4 text-green-500" /> : 
                    <ArrowDownIcon className="w-4 h-4 text-red-500" />
                  }
                  {formatCurrency(transaction.amount)}
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
      </CardContent>
    </Card>
  );
};

export default Recent;