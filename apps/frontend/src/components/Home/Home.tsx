import ProductCard from '../ProductCard/ProductCard';
import { Col, notification, Row } from 'antd';

export interface Product {
  id: string;
  name: string;
  stockQty: number;
  price: number;
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Props {
  products: Product[];
}
export function Home({ products }: Props) {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message,
    });
  };

  return (
    <div>
      {contextHolder}
      <Row>
        {products.map((product) => (
          <Col className="gutter-row" span={4} key={product.id}>
            <ProductCard
              product={product}
              openNotificationWithIcon={openNotificationWithIcon}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
