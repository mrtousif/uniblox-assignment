import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import AppLayout from '../../components/Layout/Layout';

const { Title } = Typography;

interface OrderItem {
  productId: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  isActive: boolean;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}

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

  const handleClick = async () => {
    if (!order) {
      return;
    }
    const res = await fetch('http://localhost:4000/api/orders/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: `${order.id}`,
      }),
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
        footer={() => <Button onClick={handleClick}>Checkout</Button>}
      />
    </AppLayout>
  );
};

export default Cart;
