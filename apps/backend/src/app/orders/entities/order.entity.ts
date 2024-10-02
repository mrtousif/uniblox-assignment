import { OrderItem } from './order-item.entity';

export class Order {
  id: number;

  isActive: boolean;

  userId: string;

  items: OrderItem[];

  totalPrice: number;

  discountCode?: string | null;

  discountAmount?: number;

  status: string;
}
