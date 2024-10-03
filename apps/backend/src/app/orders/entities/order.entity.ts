import { OrderItem } from './order-item.entity';

export class Order {
  id: string;

  isActive: boolean;

  userId: string;

  items: OrderItem[];

  totalPrice: number;

  discountCode?: string | null;

  discountAmount?: number;

  status: 'active' | 'placed' | 'delivered';
}
