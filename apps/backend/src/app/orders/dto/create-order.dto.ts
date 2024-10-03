export class CreateOrderDto {
  userId: string;
  productId: string;
  quantity: number;
}

export class CheckoutDTO {
  userId: string;
  orderId: string;
  discountCode?: string;
}


export class CreateDiscountCodeDTO {
  code: string;
  amount: number;
  type?: string;
  nthOrder: number;
}
