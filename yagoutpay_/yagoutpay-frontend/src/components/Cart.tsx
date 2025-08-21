
import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart ({cart.items.length} items)</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
            
            <div className="cart-item-info">
              <h4 className="cart-item-name">{item.product.name}</h4>
              <p className="cart-item-price">ETB {item.product.price.toLocaleString()}</p>
            </div>

            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>

            <div className="cart-item-total">
              ETB {(item.product.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span className="total-amount">ETB {cart.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;