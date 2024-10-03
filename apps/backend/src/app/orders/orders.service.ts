import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CheckoutDTO, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DiscountCodes, Orders, Products } from '../db';
import { Order } from './entities/order.entity';

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
        // add new order item
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
        id: `${Orders.length + 1}`,
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

  findAll(userId: string = null) {
    if (userId) {
      return Orders.filter((order) => order.userId === userId);
    }
    return Orders;
  }

  findOne(orderId: string) {
    return Orders.find((order) => order.id === orderId);
  }

  applyDiscount(userId: string, activeOrder: Order, discountCode: string) {
    // find discount code
    const DiscountCode = DiscountCodes[discountCode];
    if (!DiscountCode || DiscountCode.isActive !== true) {
      throw new BadRequestException('Invalid discount code');
    }
    const orders = this.findAll(userId);
    // orders = orders.filter((order) => order.status === 'placed' || order.status === 'delivered')
    // check apply condition

    if (orders.length % DiscountCode.nthOrder === 0) {
      // apply discount
      if (DiscountCode.type === 'percentage') {
        activeOrder.discountAmount =
          Math.round((activeOrder.totalPrice * DiscountCode.amount) / 100);
        activeOrder.totalPrice -= activeOrder.discountAmount;
      } else if (DiscountCode.type === 'fixed') {
        activeOrder.discountAmount = DiscountCode.amount;
        activeOrder.totalPrice -= activeOrder.discountAmount;
      }
    }
    return activeOrder;
  }

  async checkout(checkoutDto: CheckoutDTO) {
    const order = this.findOne(checkoutDto.orderId);

    if (!order || order.isActive !== true) {
      throw new NotFoundException(`Order ${checkoutDto.orderId} not found`);
    }
    let updatedOrder: Order = order;
    if (checkoutDto.discountCode) {
      updatedOrder = this.applyDiscount(
        checkoutDto.userId,
        order,
        checkoutDto.discountCode
      );
    }
    // place order
    updatedOrder.status = 'placed';
    updatedOrder.isActive = false;
    const idx = Orders.findIndex((ord) => ord.id === updatedOrder.id);
    Orders[idx] = updatedOrder;

    // update stock

    return Orders[idx];
  }

  report() {
    // count of items purchased
    const purchasedOrders = Orders.filter(
      (order) => order.status === 'placed' || order.status === 'delivered'
    );
    const itemsSold = purchasedOrders.map((order) => order.items).flat();
    console.log('itemsSold', itemsSold);
    const totalItemsSold = itemsSold.length;
    // total purchase amount and total discount amount
    let totalOrderAmount = 0;
    let totalDiscountAmount = 0;
    for (const order of purchasedOrders) {
      totalOrderAmount += order.totalPrice;
      if (order.discountAmount) {
        totalDiscountAmount += order.discountAmount;
      }
    }
    // list of discount codes
    const discountCodes = Object.keys(DiscountCodes);

    return {
      discountCodes,
      totalDiscountAmount,
      totalOrderAmount,
      totalItemsSold,
    };
  }
}
