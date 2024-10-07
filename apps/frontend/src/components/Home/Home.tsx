import { API_URL } from '../../contants';
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
      const res = await fetch(API_URL + '/orders', {
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
          <Col
            className="gutter-row"
            key={product.id}
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}
            md={{ flex: '40%' }}
            lg={{ flex: '20%' }}
            xl={{ flex: '10%' }}
          >
            <ProductCard product={product} handleClick={handleClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
