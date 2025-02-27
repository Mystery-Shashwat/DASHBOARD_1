import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Share } from 'lucide-react';
import { formatDate, getStatusColor } from './utils';

interface Contact {
  name: string;
  avatar?: string;
}

interface FinancialDocument {
  id: string;
  date: string;
  lastUpdated?: string;
  complianceStatus?: 'verified' | 'pending' | 'review_required';
  createdBy?: Contact;
}

interface DetailsTabProps {
  document: FinancialDocument;
  setShowShareDialog: (show: boolean) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ document, setShowShareDialog }) => {
  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Metadata</CardTitle>
            <CardDescription>Technical details and audit information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Document ID</Label>
              <p className="text-sm font-mono">{document.id}</p>
            </div>
            <div>
              <Label>Created Date</Label>
              <p className="text-sm">{formatDate(document.date)}</p>
            </div>
            <div>
              <Label>Last Updated</Label>
              <p className="text-sm">
                {document.lastUpdated ? new Date(document.lastUpdated).toLocaleString() : 'N/A'}
              </p>
            </div>
            <div>
              <Label>Compliance Status</Label>
              <Badge variant="outline" className={getStatusColor(document.complianceStatus || '')}>
                {document.complianceStatus?.replace('_', ' ') || 'N/A'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sharing & Permissions</CardTitle>
            <CardDescription>Manage document access and collaboration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Owner</Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={document.createdBy?.avatar} />
                  <AvatarFallback>{document.createdBy?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{document.createdBy?.name || 'N/A'}</span>
              </div>
            </div>
            <div>
              <Label>Access Control</Label>
              <p className="text-sm">Private document - Only visible to account owners</p>
            </div>
            <div>
              <Label>Sharing Options</Label>
              <Button variant="outline" className="mt-2" onClick={() => setShowShareDialog(true)}>
                <Share className="mr-2 h-4 w-4" />
                Share Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailsTab;