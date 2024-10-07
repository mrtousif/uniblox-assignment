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

  const handleClick = async (product: Product) => {
    try {
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (res.status === 200 || res.status === 201) {
        openNotificationWithIcon('success', 'Successfully added to cart');
      } else {
        openNotificationWithIcon('error', 'Failed to add cart');
      }

      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <Row>
        {products.map((product) => (
          <Col className="gutter-row" span={4} key={product.id}>
            <ProductCard product={product} handleClick={handleClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
