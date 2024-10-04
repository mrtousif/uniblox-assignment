import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import AppLayout from '../../components/Layout/Layout';
import { Order, OrderItem } from '../../types';

const { Title } = Typography;



const columns: TableProps<OrderItem>['columns'] = [
  {
    title: 'Product name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
];

const Cart = () => {
  const [order, setOrder] = useState<Order>();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>();

  const handleClick = async () => {
    if (!order) {
      return;
    }
    const body = {
      orderId: `${order.id}`,
      discountCode,
    };

    if (!discountCode) {
      delete body['discountCode'];
    }
    const res = await fetch('http://localhost:4000/api/orders/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(await res.json());
  };

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch('http://localhost:4000/api/orders/active');
      const order: Order = await res.json();
      if (!order.items) {
        return;
      }
      console.log(order);
      setOrder(order);
      setOrderItems(
        order.items.map((item) => ({
          ...item,
          key: item.productId,
        }))
      );
    }

    fetchOrder();
  }, []);

  return (
    <AppLayout>
      <Title level={3}>Total price: {order?.totalPrice || 0}</Title>
      <Table<OrderItem>
        columns={columns}
        dataSource={orderItems}
        pagination={false}
        footer={() => (
          <Space>
            <Input
              placeholder="Enter discount code here"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button type="primary" onClick={handleClick}>
              Checkout
            </Button>
          </Space>
        )}
      />
    </AppLayout>
  );
};

export default Cart;
