import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Products } from '../db';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  // Mock data
  const mockProducts = [
    { id: '1', name: 'Product 1', price: 100, stockQty: 10 },
    { id: '2', name: 'Product 2', price: 200, stockQty: 5 },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    // Reset the Products array for each test
    Products.length = 0;
    Products.push(...mockProducts);
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const result = service.findAll();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return the product with the given id', () => {
      const productId = '1';
      const result = service.findOne(productId);
      expect(result).toEqual(mockProducts[0]);
    });

    it('should return undefined if the product with the given id is not found', () => {
      const productId = '3';
      const result = service.findOne(productId);
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update an existing product', () => {
      const productId = '1';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product 1',
        price: 150,
      };

      const result = service.update(productId, updateProductDto);

      expect(result).toEqual({
        id: '1',
        name: 'Updated Product 1',
        price: 150,
        stockQty: 10,
      });
    });

    it('should return undefined if the product to update is not found', () => {
      const productId = '3';
      const updateProductDto: UpdateProductDto = {
        name: 'Non-existent Product',
      };

      const result = service.update(productId, updateProductDto);

      expect(result).toBeUndefined();
    });

    it('should not modify the array if the product is not found', () => {
      const productId = '3';
      const updateProductDto: UpdateProductDto = {
        name: 'Non-existent Product',
      };

      service.update(productId, updateProductDto);

      expect(Products).toEqual(mockProducts); // Ensure the array was not modified
    });
  });
});
