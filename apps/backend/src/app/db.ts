import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';

export const Products: Product[] = [
  {
    id: 'prod001',
    name: 'Laptop',
    stockQty: 10,
    price: 999.99,
  },
  {
    id: 'prod002',
    name: 'Smartphone',
    stockQty: 25,
    price: 699.99,
  },
  {
    id: 'prod003',
    name: 'Wireless Earbuds',
    stockQty: 50,
    price: 49.99,
  },
  {
    id: 'prod004',
    name: 'Smartwatch',
    stockQty: 15,
    price: 199.99,
  },
  {
    id: 'prod005',
    name: 'Gaming Console',
    stockQty: 5,
    price: 499.99,
  },
  {
    id: 'prod006',
    name: 'External Hard Drive',
    stockQty: 30,
    price: 89.99,
  },
  {
    id: 'prod007',
    name: 'Wireless Mouse',
    stockQty: 45,
    price: 25.99,
  },
  {
    id: 'prod008',
    name: 'Mechanical Keyboard',
    stockQty: 20,
    price: 129.99,
  },
  {
    id: 'prod009',
    name: 'Monitor',
    stockQty: 12,
    price: 299.99,
  },
  {
    id: 'prod010',
    name: 'Graphics Card',
    stockQty: 8,
    price: 799.99,
  },
];

export const Orders: Order[] = [];

type DiscountCode = {
  type: 'percentage' | 'fixed';
  amount: number;
  nthOrder: number;
  isActive: boolean;
};

export type DiscountCodesT = {
  [code: string]: DiscountCode;
};

export const DiscountCodes: DiscountCodesT = {
  '10POFF': {
    amount: 10,
    type: 'percentage',
    isActive: true,
    nthOrder: 2,
  },
};
export const UsedDiscountCodes = [];
