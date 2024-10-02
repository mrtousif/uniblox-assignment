import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from '../db';

@Injectable()
export class ProductsService {
  findAll() {
    return Products;
  }

  findOne(id: string) {
    return Products.find((product) => product.id === id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const productIndex = Products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      Products[productIndex] = {
        ...Products[productIndex],
        ...updateProductDto,
      };
    } else {
      console.log('Product not found');
      return;
    }

    return Products[productIndex];
  }
}
