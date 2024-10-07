import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CheckoutDTO, CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrdersService = {
    addItemToOrder: jest.fn(),
    findAll: jest.fn(),
    activeOrder: jest.fn(),
    checkout: jest.fn(),
    report: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService, // Mock the OrdersService
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock history after each test
  });

  describe('addItemToOrder', () => {
    it('should call ordersService.addItemToOrder with correct parameters', async () => {
      const dto: CreateOrderDto = {
        userId: 'user1',
        productId: 'product1',
        quantity: 2,
      };

      const result = { id: '1', items: [] }; // Mock result

      mockOrdersService.addItemToOrder.mockResolvedValue(result);

      const response = await controller.addItemToOrder(dto);

      expect(service.addItemToOrder).toHaveBeenCalledWith(dto.userId, dto);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ordersService.findAll and return orders', async () => {
      const result = [{ id: '1', items: [] }]; // Mock result

      mockOrdersService.findAll.mockResolvedValue(result);

      const response = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('activeOrder', () => {
    it('should call ordersService.activeOrder and return active order', async () => {
      const result = { id: '1', items: [], isActive: true }; // Mock result

      mockOrdersService.activeOrder.mockResolvedValue(result);

      const response = await controller.activeOrder();

      expect(service.activeOrder).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('checkout', () => {
    it('should call ordersService.checkout with correct parameters', async () => {
      const dto: CheckoutDTO = {
        userId: 'user1',
        orderId: '1',
        discountCode: 'DISCOUNT10',
      };

      const result = { id: '1', status: 'placed', isActive: false }; // Mock result

      mockOrdersService.checkout.mockResolvedValue(result);

      const response = await controller.checkout(dto);

      expect(service.checkout).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe('report', () => {
    it('should call ordersService.report and return report data', async () => {
      const result = {
        totalItemsSold: 10,
        totalOrderAmount: 1000,
        totalDiscountAmount: 100,
        discountCodes: ['DISCOUNT10'],
      }; // Mock result

      mockOrdersService.report.mockResolvedValue(result);

      const response = await controller.report();

      expect(service.report).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });
});
