
export interface Product {
  id: string;
  external_id: string; // ID from Printful/Gelato
  source: 'printful' | 'gelato' | 'internal';
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface OrderDetails {
  order_id: string;
  amount: number;
  currency: string;
}
