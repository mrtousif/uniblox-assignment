import { Product } from '../../products/entities/product.entity';

export class OrderItem {
  productId: string;

  quantity: number;

  price: number;
}
