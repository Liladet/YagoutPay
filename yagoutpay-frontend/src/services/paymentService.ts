import { PaymentRequest, PaymentResponse } from '../types/payment';

const API_BASE_URL = 'http://localhost:5000';

export const paymentService = {
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    const response = await fetch(`${API_BASE_URL}/initiate-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Payment initiation failed');
    }

    return response.json();
  },

  async getTransactionHistory(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    return response.json();
  }
};