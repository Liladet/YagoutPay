export interface PaymentRequest {
  amount: string;
  name: string;
  email: string;
  phone: string;
}

export interface PaymentResponse {
  redirectUrl: string;
  transactionId: string;
}

export interface Transaction {
  id: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  customerEmail: string;
  customerName: string;
  timestamp: string;
}