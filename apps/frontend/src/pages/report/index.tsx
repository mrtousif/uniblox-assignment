import React, { useEffect } from 'react';
import { Typography } from 'antd';
import AppLayout from '../../components/Layout/Layout';

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
    async function fetchReport() {
      const res = await fetch('http://localhost:4000/api/orders/report');
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
      <Title level={3}>Total items sold: {stats?.totalItemsSold}</Title>
      <Title level={3}>Total order amount: {stats?.totalOrderAmount}</Title>
      <Title level={3}>
        Total discount amount: {stats?.totalDiscountAmount}
      </Title>
      <Title level={3}>Discount codes: {stats?.discountCodes}</Title>
    </AppLayout>
  );
};

export default Index;
