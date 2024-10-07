import React, { useEffect } from 'react';
import { Typography, Space } from 'antd';
import AppLayout from '../../components/Layout/Layout';
import { API_URL } from '../../contants';

const { Title } = Typography;
interface Stats {
  discountCodes: string[];
  totalDiscountAmount: number;
  totalOrderAmount: number;
  totalItemsSold: number;
}

const Index = () => {
  const [stats, setStats] = React.useState<Stats>();
  useEffect(() => {
    console.log(API_URL);
    async function fetchReport() {
      const res = await fetch(API_URL + '/orders/report');
      let data: Stats = await res.json();
      if (Object.keys(data).length < 1) {
        return;
      }
      setStats(data);
    }

    fetchReport();
  }, []);

  return (
    <AppLayout>
      <Title level={4}>Total items sold: {stats?.totalItemsSold}</Title>
      <Title level={4}>Total order amount: {stats?.totalOrderAmount}</Title>
      <Title level={4}>
        Total discount amount: {stats?.totalDiscountAmount}
      </Title>
      <Space direction="vertical">
        <Title level={4}>Discount codes:</Title>
        <ul>
          {stats?.discountCodes.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </Space>
    </AppLayout>
  );
};

export default Index;
