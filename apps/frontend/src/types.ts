export interface OrderItem {
  productId: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  isActive: boolean;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}
