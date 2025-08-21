// App.tsx
import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import PaymentButton from './components/PaymentButton';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'cart' | 'checkout'>('products');

  return (
    <CartProvider>
      <div className="app">
        <header className="app-header">
          <h1>YagoutPay Store</h1>
          <nav className="app-nav">
            <button 
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={activeTab === 'cart' ? 'active' : ''}
              onClick={() => setActiveTab('cart')}
            >
              Cart
            </button>
            <button 
              className={activeTab === 'checkout' ? 'active' : ''}
              onClick={() => setActiveTab('checkout')}
            >
              Checkout
            </button>
          </nav>
        </header>

        <main className="app-main">
          {activeTab === 'products' && <ProductList />}
          {activeTab === 'cart' && <Cart />}
          {activeTab === 'checkout' && <PaymentButton />}
        </main>
      </div>
    </CartProvider>
  );
};

export default App;