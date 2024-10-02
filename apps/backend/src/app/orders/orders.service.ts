import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders, Products } from '../db';

@Injectable()
export class OrdersService {
  addItemToOrder(userId: string, createOrderDto: CreateOrderDto) {
    // find product
    const product = Products.find(
      (item) => item.id === createOrderDto.productId
    );
    if (!product) {
      throw new NotFoundException(
        `Product ${createOrderDto.productId} not found`
      );
    }

    if (product.stockQty < createOrderDto.quantity) {
      throw new BadRequestException(`Out of stock`);
    }
    // if an order is active i.e order is not placed yet
    const existingOrderIdx = Orders.findIndex(
      (order) => order.isActive === true && order.userId === userId
    );
    if (existingOrderIdx !== -1) {
      // find existing cart item
      const existingOrderItemIdx = Orders[existingOrderIdx].items.findIndex(
        (item) => item.productId === createOrderDto.productId
      );
      if (existingOrderItemIdx !== -1) {
        // if the item already added to order then increment the price and quantity
        Orders[existingOrderIdx].items[existingOrderItemIdx].quantity +=
          createOrderDto.quantity;
        let price = 0;
        Orders[existingOrderIdx].items.forEach((element) => {
          price += element.price * element.quantity;
        });
        Orders[existingOrderIdx].totalPrice = price;
      } else {
        // create new order
        Orders[existingOrderIdx].items.push({
          productId: product.id,
          price: product.price,
          quantity: createOrderDto.quantity,
        });
        Orders[existingOrderIdx].totalPrice +=
          product.price * createOrderDto.quantity;
      }
    } else {
      // create new order
      Orders.push({
        id: Orders.length + 1,
        isActive: true,
        userId,
        totalPrice: product.price * createOrderDto.quantity,
        status: 'active',
        items: [
          {
            price: product.price,
            productId: product.id,
            quantity: createOrderDto.quantity,
          },
        ],
      });
    }

    return Orders.find(
      (order) => order.isActive === true && order.userId === userId
    );
  }

  findAll() {
    return Orders;
  }

  async applyDiscount(orderId: string, discountCode: string) {}

  async checkout(orderId: string) {}
}
