// components/PaymentButton.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import CustomerInfoForm from './CustomerInfoForm';
import './PaymentButton.css';

const PaymentButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { cart, clearCart } = useCart();

  const handlePayment = async () => {
    if (cart.items.length === 0 || !cart.customerInfo) {
      setError('Please complete customer information first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const paymentData = {
        amount: cart.total.toString(),
        name: cart.customerInfo.name,
        email: cart.customerInfo.email,
        phone: cart.customerInfo.phone,
        items: cart.items.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        }))
      };

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
      
      // Clear cart after successful payment initiation
      clearCart();
      
    } catch (error) {
      console.error('Payment error:', error);
      
      let errorMessage = 'Payment failed. Please try again.';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!showPayment) {
    return <CustomerInfoForm onContinue={() => setShowPayment(true)} />;
  }

  return (
    <div className="payment-section">
      <div className="payment-summary">
        <h3>Order Summary</h3>
        
        <div className="customer-details">
          <h4>Customer Information</h4>
          <p><strong>Name:</strong> {cart.customerInfo?.name}</p>
          <p><strong>Email:</strong> {cart.customerInfo?.email}</p>
          <p><strong>Phone:</strong> {cart.customerInfo?.phone}</p>
          {cart.customerInfo?.address && (
            <p><strong>Address:</strong> {cart.customerInfo.address}</p>
          )}
        </div>
        
        <div className="order-details">
          <h4>Order Items</h4>
          {cart.items.map((item) => (
            <div key={item.product.id} className="order-item">
              <span>{item.product.name} × {item.quantity}</span>
              <span>ETB {(item.product.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        
        <div className="order-total">
          <span>Total:</span>
          <span>ETB {cart.total.toLocaleString()}</span>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="payment-actions">
          <button 
            onClick={() => setShowPayment(false)}
            className="back-btn"
          >
            Edit Information
          </button>
          <button 
            onClick={handlePayment} 
            disabled={loading}
            className={`pay-now-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing Payment...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>
        
        <div className="payment-info">
          <p>You will be redirected to YagoutPay to complete your payment securely.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentButton;