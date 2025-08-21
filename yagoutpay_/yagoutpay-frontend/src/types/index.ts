// types/index.ts
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  customerInfo?: CustomerInfo;
}