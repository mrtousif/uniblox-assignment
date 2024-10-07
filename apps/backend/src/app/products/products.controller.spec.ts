import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockProducts = [
    { id: '1', name: 'Product 1', price: 100, stockQty: 10 },
    { id: '2', name: 'Product 2', price: 200, stockQty: 5 },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService, // Mock ProductsService
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock history after each test
  });

  describe('findAll', () => {
    it('should call productsService.findAll and return all products', async () => {
      // Arrange: Mock the service to return the product data
      mockProductsService.findAll.mockResolvedValue(mockProducts);

      // Act: Call the controller's findAll method
      const result = await controller.findAll();

      // Assert: Ensure the service was called and the result is correct
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should call productsService.findOne with correct id and return the product', async () => {
      const productId = '1';
      const product = mockProducts[0];

      // Arrange: Mock the service to return the specific product
      mockProductsService.findOne.mockResolvedValue(product);

      // Act: Call the controller's findOne method
      const result = await controller.findOne(productId);

      // Assert: Ensure the service was called with the correct parameter and the result is correct
      expect(service.findOne).toHaveBeenCalledWith(productId);
      expect(result).toEqual(product);
    });

    it('should return undefined if product is not found', async () => {
      const productId = '3';

      // Arrange: Mock the service to return undefined for a non-existent product
      mockProductsService.findOne.mockResolvedValue(undefined);

      // Act: Call the controller's findOne method
      const result = await controller.findOne(productId);

      // Assert: Ensure the service was called with the correct id and the result is undefined
      expect(service.findOne).toHaveBeenCalledWith(productId);
      expect(result).toBeUndefined();
    });
  });
});
