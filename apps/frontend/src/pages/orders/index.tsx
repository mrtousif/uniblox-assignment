import React, { useEffect } from 'react';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';
import AppLayout from '../../components/Layout/Layout';
import { Order } from '../../types';

const columns: TableColumnsType<Order> = [
  { title: 'OrderID', dataIndex: 'id', key: 'id' },
  { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const Index = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch('http://localhost:4000/api/orders');
      let data: Order[] = await res.json();
      if (data.length < 1) {
        return;
      }
      data = data.map((item) => ({ ...item, key: item.id }));
      setOrders(data);
    }

    fetchOrder();
  }, []);

  return (
    <AppLayout>
      <Table<Order> columns={columns} dataSource={orders} pagination={false} />
    </AppLayout>
  );
};

export default Index;
