import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, FileText, Download, Share, Shield } from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import OverviewTab from "./OverviewTab";
import TransactionsTab from "./TransactionsTab";
import AnalyticsTab from "./AnalyticsTab";
import DetailsTab from "./DetailsTab";
import { getStatusColor, formatDate, formatCurrency } from "./utils";

// Define types
interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
  status: "pending" | "completed" | "failed";
  account?: string;
  merchant?: string;
  reference?: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar?: string;
}

interface FinancialDocument {
  id: string;
  title: string;
  type: "statement" | "invoice" | "report" | "receipt";
  date: string;
  dueDate?: string;
  transactions: Transaction[];
  totalAmount: number;
  status: "draft" | "final" | "archived" | "pending_approval";
  createdBy?: Contact;
  lastUpdated?: string;
  currency: string;
  complianceStatus?: "verified" | "pending" | "review_required";
  period?: { from: string; to: string };
  tags?: string[];
  notes?: string;
}

interface AnalyticsSummary {
  monthlySpending: number[];
  categoryBreakdown: { category: string; amount: number; percentage: number }[];
  complianceScore: number;
  pendingActions: number;
}

const History: React.FC<{ documentId?: string }> = ({ documentId }) => {
  const [document, setDocument] = useState<FinancialDocument | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [showShareDialog, setShowShareDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockDocument: FinancialDocument = {
          id: documentId || "FIN-2025-0042",
          title: "Q1 Financial Statement",
          type: "statement",
          date: "2025-02-27",
          dueDate: "2025-03-15",
          currency: "INR",
          transactions: [
            {
              id: "tx-001",
              date: "2025-02-25",
              amount: 1250.0,
              description: "Client Payment - Acme Corp",
              category: "income",
              status: "completed",
              account: "Business Checking",
              merchant: "Acme Corporation",
              reference: "INV-2025-0039",
            },
            {
              id: "tx-002",
              date: "2025-02-26",
              amount: -420.5,
              description: "Software Subscription - Cloud Services",
              category: "expense",
              status: "completed",
              account: "Business Credit",
              merchant: "Cloud Provider Inc.",
              reference: "SUB-28574",
            },
            {
              id: "tx-003",
              date: "2025-02-27",
              amount: -150.25,
              description: "Office Supplies",
              category: "expense",
              status: "pending",
              account: "Business Credit",
              merchant: "Office Depot",
              reference: "PO-38294",
            },
            {
              id: "tx-004",
              date: "2025-02-20",
              amount: 850.0,
              description: "Consulting Services",
              category: "income",
              status: "completed",
              account: "Business Checking",
              merchant: "Johnson Consulting LLC",
              reference: "INV-2025-0037",
            },
            {
              id: "tx-005",
              date: "2025-02-18",
              amount: -375.0,
              description: "Marketing Campaign - Social Media",
              category: "marketing",
              status: "completed",
              account: "Marketing Budget",
              merchant: "Digital Ads Platform",
              reference: "AD-93842",
            },
            {
              id: "tx-006",
              date: "2025-02-15",
              amount: -250.0,
              description: "Team Lunch",
              category: "meals",
              status: "completed",
              account: "Business Credit",
              merchant: "Downtown Bistro",
              reference: "EXP-28475",
            },
          ],
          totalAmount: 904.25,
          status: "final",
          createdBy: {
            id: "user-001",
            name: "Jessica Chen",
            email: "jessica.chen@company.com",
            company: "Financial Services Inc.",
            avatar: "/api/placeholder/32/32",
          },
          lastUpdated: "2025-02-27T14:30:00Z",
          complianceStatus: "verified",
          period: { from: "2025-01-01", to: "2025-03-31" },
          tags: ["quarterly", "verified", "tax-ready"],
          notes:
            "This document has been verified by compliance and is ready for tax filing.",
        };
        setDocument(mockDocument);
        const mockAnalytics: AnalyticsSummary = {
          monthlySpending: [3200, 2800, 3500, 4100, 3700, 4200],
          categoryBreakdown: [
            { category: "Software", amount: 420.5, percentage: 35 },
            { category: "Office Supplies", amount: 150.25, percentage: 12 },
            { category: "Marketing", amount: 375.0, percentage: 30 },
            { category: "Meals", amount: 250.0, percentage: 23 },
          ],
          complianceScore: 92,
          pendingActions: 1,
        };
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocument();
  }, [documentId]);

  const handleDownloadPDF = () => {
    if (!document || !analytics) return;

    const doc = new jsPDF();

    // Title and Header
    doc.setFontSize(18);
    doc.text(document.title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Document ID: ${document.id}`, 20, 30);
    doc.text(
      `Status: ${
        document.status.replace("_", " ").charAt(0).toUpperCase() +
        document.status.replace("_", " ").slice(1)
      }`,
      20,
      40
    );
    doc.text(`Date: ${formatDate(document.date)}`, 20, 50);
    if (document.dueDate)
      doc.text(`Due Date: ${formatDate(document.dueDate)}`, 20, 60);

    // Overview Section
    doc.setFontSize(14);
    doc.text("Overview", 20, 80);
    doc.setFontSize(10);
    doc.text(`Type: ${document.type}`, 20, 90);
    doc.text(
      `Total Amount: ${formatCurrency(
        document.totalAmount,
        document.currency
      )}`,
      20,
      100
    );
    doc.text(
      `Last Updated: ${
        document.lastUpdated
          ? formatDate(document.lastUpdated)
          : formatDate(document.date)
      }`,
      20,
      110
    );
    if (document.createdBy)
      doc.text(`Created By: ${document.createdBy.name}`, 20, 120);

    // Transactions Section
    doc.setFontSize(14);
    doc.text("Transactions", 20, 140);
    doc.setFontSize(10);
    let yPos = 150;
    document.transactions.forEach((tx, index) => {
      doc.text(
        `${index + 1}. ${tx.description} - ${formatCurrency(
          tx.amount,
          document.currency
        )} (${tx.status})`,
        20,
        yPos
      );
      yPos += 10;
      if (yPos > 270) {
        // Add new page if needed
        doc.addPage();
        yPos = 20;
      }
    });

    // Analytics Section
    doc.setFontSize(14);
    doc.text("Analytics", 20, yPos + 10);
    doc.setFontSize(10);
    yPos += 20;
    doc.text(`Compliance Score: ${analytics.complianceScore}/100`, 20, yPos);
    yPos += 10;
    doc.text("Category Breakdown:", 20, yPos);
    analytics.categoryBreakdown.forEach((cat, index) => {
      yPos += 10;
      doc.text(
        `${cat.category}: ${formatCurrency(cat.amount, document.currency)} (${
          cat.percentage
        }%)`,
        30,
        yPos
      );
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Save the PDF
    doc.save(`${document.title.replace(/\s+/g, "_")}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!document) {
    return (
      <Card className="mx-auto max-w-md mt-8">
        <CardHeader>
          <CardTitle className="text-center">Document Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-gray-500">
            The requested document could not be found. Please check the document
            ID and try again.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Return to Documents</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="w-full shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-2xl">{document.title}</CardTitle>
                {document.complianceStatus === "verified" && (
                  <Shield className="h-5 w-5 text-green-600" />
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Document #{document.id} | {formatDate(document.date)}
                {document.dueDate && ` | Due: ${formatDate(document.dueDate)}`}
              </p>
            </div>
            <Badge className={getStatusColor(document.status)}>
              {document.status.replace("_", " ").charAt(0).toUpperCase() +
                document.status.replace("_", " ").slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <OverviewTab document={document} setActiveTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="transactions">
            <TransactionsTab document={document} />
          </TabsContent>
          <TabsContent value="analytics">
            {analytics ? (
              <AnalyticsTab document={document} analytics={analytics} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Loading</CardTitle>
                  <CardDescription>
                    Please wait while we load the analytics data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="details">
            <DetailsTab
              document={document}
              setShowShareDialog={setShowShareDialog}
            />
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>
              Share this document with team members or external partners
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email Addresses
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email addresses"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Permissions</label>
              <Select defaultValue="view">
                <SelectTrigger>
                  <SelectValue placeholder="Select permissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View Only</SelectItem>
                  <SelectItem value="comment">Can Comment</SelectItem>
                  <SelectItem value="edit">Can Edit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success("Successfully sent");
                setShowShareDialog(false);
              }}
            >
              <Share className="mr-2 h-4 w-4" />
              Send Invites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
