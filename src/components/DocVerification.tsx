"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { FileText, Search, CheckCircle, XCircle, Clock, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const documentTypes = [
  { id: "id", name: "ID Card" },
  { id: "passport", name: "Passport" },
  { id: "driving_license", name: "Driving License" },
  { id: "utility_bill", name: "Utility Bill" },
  { id: "bank_statement", name: "Bank Statement" },
]

const initialDocuments = [
  {
    id: 1,
    name: "ID Card.pdf",
    type: "id",
    status: "pending",
    date: "2023-10-15",
    comments: "",
    user: { id: 101, name: "John Doe", email: "john@example.com" },
  },
  {
    id: 2,
    name: "Utility Bill.pdf",
    type: "utility_bill",
    status: "pending",
    date: "2023-10-20",
    comments: "",
    user: { id: 102, name: "Jane Smith", email: "jane@example.com" },
  },
  {
    id: 3,
    name: "Bank Statement.pdf",
    type: "bank_statement",
    status: "pending",
    date: "2023-10-10",
    comments: "",
    user: { id: 103, name: "Robert Johnson", email: "robert@example.com" },
  },
  {
    id: 4,
    name: "Passport.pdf",
    type: "passport",
    status: "verified",
    date: "2023-10-05",
    comments: "All details verified",
    user: { id: 104, name: "Emily Davis", email: "emily@example.com" },
  },
  {
    id: 5,
    name: "Driving License.pdf",
    type: "driving_license",
    status: "rejected",
    date: "2023-10-08",
    comments: "Document expired",
    user: { id: 105, name: "Michael Wilson", email: "michael@example.com" },
  },
]

export default function DocVerification() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [verificationComment, setVerificationComment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleVerify = (approved: boolean) => {
    if (!selectedDocument) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      const updatedDocuments = documents.map((doc) => {
        if (doc.id === selectedDocument.id) {
          return {
            ...doc,
            status: approved ? "verified" : "rejected",
            comments: verificationComment,
          }
        }
        return doc
      })

      setDocuments(updatedDocuments)
      setVerificationComment("")
      setIsProcessing(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        )
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Document Verification</h1>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by document name or user..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Document Type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Documents</CardTitle>
              <CardDescription>Review and verify user submitted documents</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.filter((doc) => doc.status === "pending").length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No pending documents to verify</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments
                    .filter((doc) => doc.status === "pending")
                    .map((doc) => (
                      <Dialog key={doc.id}>
                        <DialogTrigger asChild>
                          <div
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-primary" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                  <p className="text-sm text-muted-foreground">
                                    {documentTypes.find((t) => t.id === doc.type)?.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground hidden sm:block">•</p>
                                  <p className="text-sm text-muted-foreground">{doc.user.name}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(doc.status)}
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Document Verification</DialogTitle>
                            <DialogDescription>Review and verify the document</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Document Name</p>
                                <p>{doc.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Document Type</p>
                                <p>{documentTypes.find((t) => t.id === doc.type)?.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Upload Date</p>
                                <p>{doc.date}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="mt-1">{getStatusBadge(doc.status)}</div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground">User Information</p>
                              <div className="p-2 bg-muted rounded-md mt-1">
                                <p>
                                  <span className="font-medium">Name:</span> {doc.user.name}
                                </p>
                                <p>
                                  <span className="font-medium">Email:</span> {doc.user.email}
                                </p>
                              </div>
                            </div>

                            <div className="border rounded-md p-4 flex items-center justify-center min-h-[200px]">
                              <p className="text-muted-foreground">Document preview would appear here</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="verification-comment">Verification Comment</Label>
                              <Textarea
                                id="verification-comment"
                                placeholder="Add comments about the document verification"
                                value={verificationComment}
                                onChange={(e) => setVerificationComment(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter className="flex flex-col sm:flex-row gap-2">
                            <Button
                              variant="destructive"
                              onClick={() => handleVerify(false)}
                              disabled={isProcessing}
                              className="sm:flex-1"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject Document
                            </Button>
                            <Button onClick={() => handleVerify(true)} disabled={isProcessing} className="sm:flex-1">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Document
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Verified Documents</CardTitle>
              <CardDescription>Documents that have been approved</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.filter((doc) => doc.status === "verified").length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No verified documents found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments
                    .filter((doc) => doc.status === "verified")
                    .map((doc) => (
                      <Dialog key={doc.id}>
                        <DialogTrigger asChild>
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-primary" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                  <p className="text-sm text-muted-foreground">
                                    {documentTypes.find((t) => t.id === doc.type)?.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground hidden sm:block">•</p>
                                  <p className="text-sm text-muted-foreground">{doc.user.name}</p>
                                </div>
                              </div>
                            </div>
                            {getStatusBadge(doc.status)}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Document Details</DialogTitle>
                            <DialogDescription>View verified document information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Document Name</p>
                                <p>{doc.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Document Type</p>
                                <p>{documentTypes.find((t) => t.id === doc.type)?.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Upload Date</p>
                                <p>{doc.date}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="mt-1">{getStatusBadge(doc.status)}</div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground">User Information</p>
                              <div className="p-2 bg-muted rounded-md mt-1">
                                <p>
                                  <span className="font-medium">Name:</span> {doc.user.name}
                                </p>
                                <p>
                                  <span className="font-medium">Email:</span> {doc.user.email}
                                </p>
                              </div>
                            </div>

                            {doc.comments && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Verification Comments</p>
                                <p className="p-2 bg-muted rounded-md mt-1">{doc.comments}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Documents</CardTitle>
              <CardDescription>Documents that have been rejected</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDocuments.filter((doc) => doc.status === "rejected").length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No rejected documents found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments
                    .filter((doc) => doc.status === "rejected")
                    .map((doc) => (
                      <Dialog key={doc.id}>
                        <DialogTrigger asChild>
                          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-primary" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                  <p className="text-sm text-muted-foreground">
                                    {documentTypes.find((t) => t.id === doc.type)?.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground hidden sm:block">•</p>
                                  <p className="text-sm text-muted-foreground">{doc.user.name}</p>
                                </div>
                              </div>
                            </div>
                            {getStatusBadge(doc.status)}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Document Details</DialogTitle>
                            <DialogDescription>View rejected document information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Document Name</p>
                                <p>{doc.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Document Type</p>
                                <p>{documentTypes.find((t) => t.id === doc.type)?.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Upload Date</p>
                                <p>{doc.date}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="mt-1">{getStatusBadge(doc.status)}</div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground">User Information</p>
                              <div className="p-2 bg-muted rounded-md mt-1">
                                <p>
                                  <span className="font-medium">Name:</span> {doc.user.name}
                                </p>
                                <p>
                                  <span className="font-medium">Email:</span> {doc.user.email}
                                </p>
                              </div>
                            </div>

                            {doc.comments && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Rejection Reason</p>
                                <p className="p-2 bg-muted rounded-md mt-1">{doc.comments}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

