"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample document types
const documentTypes = [
  { id: "id", name: "ID Card" },
  { id: "passport", name: "Passport" },
  { id: "driving_license", name: "Driving License" },
  { id: "utility_bill", name: "Utility Bill" },
  { id: "bank_statement", name: "Bank Statement" },
]

// Sample documents data
const initialDocuments = [
  { id: 1, name: "ID Card.pdf", type: "id", status: "verified", date: "2023-10-15", comments: "Verified successfully" },
  { id: 2, name: "Utility Bill.pdf", type: "utility_bill", status: "pending", date: "2023-10-20", comments: "" },
  {
    id: 3,
    name: "Bank Statement.pdf",
    type: "bank_statement",
    status: "rejected",
    date: "2023-10-10",
    comments: "Document is expired",
  },
]

export default function Documents() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!selectedFile || !documentType) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: selectedFile.name,
        type: documentType,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
        comments: "",
      }

      setDocuments([...documents, newDocument])
      setSelectedFile(null)
      setDocumentType("")
      setIsUploading(false)
    }, 1500)
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

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Document Center</h1>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="my-documents">My Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>Upload your identification documents for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="document-file">Document File</Label>
                <div
                  className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("document-file")?.click()}
                >
                  <Input
                    id="document-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    {selectedFile ? (
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG or PNG (max. 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !documentType || isUploading}
                className="w-full"
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="my-documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Documents</CardTitle>
              <CardDescription>View and manage your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No documents uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
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
                              <p className="text-sm text-muted-foreground">
                                {documentTypes.find((t) => t.id === doc.type)?.name} • {doc.date}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(doc.status)}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Document Details</DialogTitle>
                          <DialogDescription>View information about your document</DialogDescription>
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

                          {doc.comments && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Comments</p>
                              <p className="p-2 bg-muted rounded-md mt-1">{doc.comments}</p>
                            </div>
                          )}

                          <div className="border rounded-md p-4 flex items-center justify-center">
                            <p className="text-muted-foreground">Document preview would appear here</p>
                          </div>
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

