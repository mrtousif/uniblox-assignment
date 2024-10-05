import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useRouter } from 'next/router';

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
  let router = useRouter();
  const [current, setCurrent] = useState(
    router.pathname === '/' || router.pathname === ''
      ? 'home'
      : router.pathname.split('/')[1]
  );

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (router && router.pathname.length > 1) {
      if (current !== router.pathname.split('/')[1]) {
        setCurrent(router.pathname.split('/')[1]);
      }
    }
  }, [router, current]);

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
