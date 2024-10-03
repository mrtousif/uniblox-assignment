import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDTO, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addItemToOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addItemToOrder(
      createOrderDto.userId,
      createOrderDto
    );
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('active')
  activeOrder() {
    return this.ordersService.activeOrder();
  }

  @Post('/checkout')
  checkout(@Body() checkoutDto: CheckoutDTO) {
    return this.ordersService.checkout(checkoutDto);
  }

  @Get('report')
  report() {
    return this.ordersService.report();
  }
}
