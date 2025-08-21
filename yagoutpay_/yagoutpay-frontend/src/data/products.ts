// data/products.ts
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Premium wireless headphones with noise cancellation",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    description: "Feature-rich smartwatch with health monitoring",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 2499,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    description: "Automatic coffee maker with programmable settings",
    category: "Home & Kitchen"
  },
  {
    id: 4,
    name: "Yoga Mat",
    price: 1299,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    description: "Eco-friendly yoga mat with non-slip surface",
    category: "Fitness"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1999,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    description: "Portable speaker with excellent sound quality",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 3499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    description: "Comfortable running shoes for athletes",
    category: "Sports"
  }
];