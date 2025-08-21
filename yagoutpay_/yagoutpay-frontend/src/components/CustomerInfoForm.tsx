// components/CustomerInfoForm.tsx
import React, { useState } from 'react';
import { CustomerInfo } from '../types';
import { useCart } from '../context/CartContext';
import './CustomerInfoForm.css';

interface CustomerInfoFormProps {
  onContinue: () => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ onContinue }) => {
  const { cart, updateCustomerInfo } = useCart();
  const [formData, setFormData] = useState<CustomerInfo>({
    name: cart.customerInfo?.name || '',
    email: cart.customerInfo?.email || '',
    phone: cart.customerInfo?.phone || '',
    address: cart.customerInfo?.address || ''
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^09\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits starting with 09';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateCustomerInfo(formData);
      onContinue();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CustomerInfo]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="customer-info-form">
      <h3>Customer Information</h3>
      <p>Please enter your details to proceed with payment</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09XXXXXXXX"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Delivery Address (Optional)</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Enter delivery address"
          />
        </div>
        
        <button type="submit" className="continue-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CustomerInfoForm;