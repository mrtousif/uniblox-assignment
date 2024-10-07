import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders, Products, DiscountCodes } from '../db';
import { CreateOrderDto, CheckoutDTO } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

jest.mock('../db', () => ({
  Products: [
    { id: '1', name: 'Product 1', price: 100, stockQty: 10 },
    { id: '2', name: 'Product 2', price: 200, stockQty: 5 },
  ],
  Orders: [],
  DiscountCodes: {
    DISCOUNT10: { type: 'percentage', amount: 10, isActive: true, nthOrder: 2 },
  },
}));

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    service = new OrdersService();
    Orders.length = 0;
  });

  describe('addItemToOrder', () => {
    it('should throw NotFoundException if product is not found', () => {
      const dto: CreateOrderDto = { productId: '99', quantity: 1 };
      expect(() => service.addItemToOrder('user1', dto)).toThrow(
        new NotFoundException('Product 99 not found')
      );
    });

    it('should throw BadRequestException if product stock is insufficient', () => {
      const dto: CreateOrderDto = { productId: '1', quantity: 20 };
      expect(() => service.addItemToOrder('user1', dto)).toThrow(
        new BadRequestException('Out of stock')
      );
    });

    it('should add a new order if no active order exists', () => {
      const dto: CreateOrderDto = { productId: '1', quantity: 1 };
      const order = service.addItemToOrder('user1', dto);

      expect(order.items.length).toBe(1);
      expect(Orders.length).toBe(1);
      expect(Orders[0].isActive).toBe(true);
      expect(Orders[0].totalPrice).toBe(100);
    });

    it('should add the product to an existing active order', () => {
      // Simulate existing order
      Orders.push({
        id: '1',
        isActive: true,
        userId: 'user1',
        totalPrice: 100,
        status: 'active',
        items: [{ productId: '1', price: 100, quantity: 1, name: 'Product 1' }],
      });

      const dto: CreateOrderDto = { productId: '1', quantity: 1 };
      const order = service.addItemToOrder('user1', dto);

      expect(order.items.length).toBe(1);
      expect(order.items[0].quantity).toBe(2); // Incremented quantity
      expect(order.totalPrice).toBe(200); // Updated price
    });
  });

  describe('applyDiscount', () => {
    it('should throw BadRequestException for invalid discount code', () => {
      const activeOrder: Order = {
        id: '1',
        isActive: true,
        userId: 'user1',
        totalPrice: 200,
        items: [],
        status: 'active',
      };

      expect(() =>
        service.applyDiscount('user1', activeOrder, 'INVALID')
      ).toThrow(new BadRequestException('Invalid discount code'));
    });

    it('should apply percentage discount on nth order', () => {
      Orders.push({
        id: '1',
        isActive: false,
        userId: 'user1',
        totalPrice: 100,
        items: [],
        status: 'placed',
      });

      Orders.push({
        id: '2',
        isActive: true,
        userId: 'user1',
        totalPrice: 200,
        items: [],
        status: 'active',
      });

      const activeOrder = Orders[1];
      const orderWithDiscount = service.applyDiscount(
        'user1',
        activeOrder,
        'DISCOUNT10'
      );

      expect(orderWithDiscount.discountAmount).toBe(20); // 10% of 200
      expect(orderWithDiscount.totalPrice).toBe(180);
    });
  });

  describe('checkout', () => {
    it('should throw NotFoundException if order is not found', async () => {
      const checkoutDto: CheckoutDTO = {
        userId: 'user1',
        orderId: '99',
        discountCode: null,
      };
      await expect(service.checkout(checkoutDto)).rejects.toThrow(
        new NotFoundException('Order 99 not found')
      );
    });

    it('should place an order and mark it as inactive', async () => {
      Orders.push({
        id: '1',
        isActive: true,
        userId: 'user1',
        totalPrice: 200,
        items: [],
        status: 'active',
      });

      const checkoutDto: CheckoutDTO = {
        userId: 'user1',
        orderId: '1',
        discountCode: null,
      };
      const placedOrder = await service.checkout(checkoutDto);

      expect(placedOrder.status).toBe('placed');
      expect(placedOrder.isActive).toBe(false);
    });
  });

  describe('report', () => {
    it('should generate a sales report', () => {
      Orders.push({
        id: '1',
        isActive: false,
        userId: 'user1',
        totalPrice: 100,
        status: 'placed',
        items: [{ productId: '1', price: 100, quantity: 1, name: 'Product 1' }],
      });

      const report = service.report();
      expect(report.totalOrderAmount).toBe(100);
      expect(report.totalItemsSold).toBe(1);
      expect(report.discountCodes).toContain('DISCOUNT10');
    });
  });
});
