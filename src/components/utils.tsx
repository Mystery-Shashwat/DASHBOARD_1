import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'draft': return 'bg-yellow-100 text-yellow-800';
    case 'final': return 'bg-green-100 text-green-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    case 'pending': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'failed': return 'bg-red-100 text-red-800';
    case 'pending_approval': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'pending': return <Clock className="w-4 h-4 text-blue-600" />;
    case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
    default: return null;
  }
};

export const formatCurrency = (amount: number, currencyCode = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};