import React from 'react';
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next/types';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import AppLayout from '../../components/Layout/Layout';

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

const Cart = ({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  let orderItems = [];
  if (orders.length > 0) {
    orderItems = orders[0].items.map((item) => ({
      ...item,
      key: item.productId,
    }));
  }

  return (
    <AppLayout>
      <Table<OrderItem> columns={columns} dataSource={orderItems} />
    </AppLayout>
  );
};

export const getServerSideProps = (async (context) => {
  let orders = [];
  try {
    const res = await fetch('http://localhost:4000/api/orders');
    orders = await res.json();
  } catch (error) {
    console.error(error);
  }

  return { props: { orders } };
}) satisfies GetServerSideProps<{
  orders: Order[];
}>;

export default Cart;
