import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Typography, notification } from 'antd';
import type { TableProps } from 'antd';
import AppLayout from '../../components/Layout/Layout';
import { Order, OrderItem } from '../../types';
import { API_URL } from '../../contants';

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
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => {
    api[type]({
      message,
    });
  };

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
    const res = await fetch(API_URL + '/orders/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200 || res.status === 201) {
      openNotificationWithIcon('success', 'Order placed');
    } else {
      openNotificationWithIcon('error', 'Failed to place order');
    }
  };

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(API_URL + '/orders/active');
      const order: Order = await res.json();
      if (!order.items) {
        return;
      }

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
      {contextHolder}
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
