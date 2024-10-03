import { Product } from '../../products/entities/product.entity';

export class OrderItem {
  productId: string;
  name: string;

  quantity: number;

  price: number;
}
