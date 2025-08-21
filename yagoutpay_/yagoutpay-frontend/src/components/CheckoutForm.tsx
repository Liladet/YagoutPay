import React, { useState } from 'react';
import axios from 'axios';
import './PaymentButton.css'; // We'll create this CSS file

function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    amount: "1",
    name: "Test User",
    email: "test@email.com",
    phone: "0909260339"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:5000/initiate-payment', paymentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const { me_id, merchant_request, hash, url } = response.data;
      
      // Create a form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;
      
      const meIdInput = document.createElement('input');
      meIdInput.type = 'hidden';
      meIdInput.name = 'me_id';
      meIdInput.value = me_id;
      
      const merchantRequestInput = document.createElement('input');
      merchantRequestInput.type = 'hidden';
      merchantRequestInput.name = 'merchant_request';
      merchantRequestInput.value = merchant_request;
      
      const hashInput = document.createElement('input');
      hashInput.type = 'hidden';
      hashInput.name = 'hash';
      hashInput.value = hash;
      
      form.appendChild(meIdInput);
      form.appendChild(merchantRequestInput);
      form.appendChild(hashInput);
      
      document.body.appendChild(form);
      form.submit();
      
    } catch (error) {
  console.error('Payment error:', error);
  
  let errorMessage = 'Payment failed. Please try again.';
  
  if (axios.isAxiosError(error)) {
    // Axios error with response
    errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    // Standard JavaScript Error
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // String error
    errorMessage = error;
  }
  
  setError(errorMessage);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Make a Payment</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={paymentData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={paymentData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={paymentData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount (ETB)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            min="1"
          />
        </div>
        
        <button 
          onClick={handlePayment} 
          disabled={loading}
          className={`pay-button ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
        
        <div className="payment-info">
          <p>You will be redirected to YagoutPay to complete your payment securely.</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentButton;