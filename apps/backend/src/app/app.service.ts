import { Injectable } from '@nestjs/common';
import { DiscountCodes } from './db';
import { CreateDiscountCodeDTO } from './orders/dto/create-order.dto';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  createDiscountCode(createDiscountCodeDTO: CreateDiscountCodeDTO) {
    DiscountCodes[createDiscountCodeDTO.code] = {
      amount: createDiscountCodeDTO.amount,
      type: 'percentage',
      isActive: true,
      nthOrder: createDiscountCodeDTO.nthOrder,
    };
  }

  getDiscountCodes() {
    return DiscountCodes;
  }
}
