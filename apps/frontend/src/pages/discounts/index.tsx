import React, { useEffect, useState } from 'react';
import type { TableColumnsType, FormProps } from 'antd';
import { Space, Table, Typography, notification } from 'antd';

import AppLayout from '../../components/Layout/Layout';
import DiscountForm, {
  FieldType,
} from '../../components/DiscountForm/DiscountForm';
import { API_URL } from '../../contants';

const { Title } = Typography;

const columns: TableColumnsType<DiscountCode> = [
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Nth Order', dataIndex: 'nthOrder', key: 'nthOrder' },
];

type DiscountCode = {
  code: string;
  type: 'percentage' | 'fixed';
  amount: number;
  nthOrder: number;
  isActive: boolean;
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Index = () => {
  const [discountCodes, setDiscountCodes] = React.useState<DiscountCode[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message,
    });
  };

  useEffect(() => {
    async function fetchDiscountCodes() {
      const res = await fetch(API_URL + '/discount-codes');
      let data: DiscountCode[] = await res.json();
      if (data.length < 1) {
        return;
      }

      setDiscountCodes(data);
    }

    fetchDiscountCodes();
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      const res = await fetch(API_URL + '/discount-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: values.code,
          amount: Number(values.amount),
          nthOrder: Number(values.nthOrder),
        }),
      });

      if (res.status === 200 || res.status === 201) {
        openNotificationWithIcon('success', 'New discount code created');
      } else {
        openNotificationWithIcon('error', 'Failed to add code');
      }

      const data: DiscountCode = await res.json();
      console.log(data);

      setDiscountCodes((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      {contextHolder}
      <Space direction="vertical" style={{ marginBottom: '1rem' }}>
        <Title level={5}>Create discount code</Title>
        <DiscountForm onFinish={onFinish} />
      </Space>
      <Table<DiscountCode>
        columns={columns}
        dataSource={discountCodes}
        pagination={false}
      />
    </AppLayout>
  );
};

export default Index;
