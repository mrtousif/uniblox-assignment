import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateDiscountCodeDTO } from './orders/dto/create-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('discount-codes')
  createDiscountCode(@Body() createDiscountCodeDTO: CreateDiscountCodeDTO) {
    return this.appService.createDiscountCode(createDiscountCodeDTO);
  }

  @Get('discount-codes')
  getDiscountCode() {
    return this.appService.getDiscountCodes();
  }
}
