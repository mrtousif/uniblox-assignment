import { IsString, IsInt, IsOptional } from 'class-validator';
export class CreateOrderDto {
  userId: string;
  @IsString()
  productId: string;

  @IsInt()
  quantity: number;
}

export class CheckoutDTO {
  userId: string;
  @IsString()
  orderId: string;

  @IsString()
  @IsOptional()
  discountCode?: string;
}

export class CreateDiscountCodeDTO {
  @IsString()
  code: string;

  @IsInt()
  amount: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsInt()
  nthOrder: number;
}
