import React from 'react';
import Link from 'next/link';
import { Layout, Menu, theme } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

const { Header, Content } = Layout;

const items: ItemType<MenuItemType>[] = [
  {
    key: 'home',
    label: <Link href="/">Home</Link>,
  },
  {
    key: 'cart',
    label: <Link href="/cart">Cart</Link>,
  },
  {
    key: 'orders',
    label: <Link href="/orders">Orders</Link>,
  },
  {
    key: 'discounts',
    label: <Link href="/discounts">Discounts</Link>,
  },
  {
    key: 'report',
    label: <Link href="/report">Report</Link>,
  },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
