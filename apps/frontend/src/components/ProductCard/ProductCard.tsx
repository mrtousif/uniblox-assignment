import { NotificationType } from '../../pages';
import { Product } from '../Home/Home';
import styles from './ProductCard.module.css';
import { Button, Card, Space, notification } from 'antd';

interface Props {
  product: Product;
  openNotificationWithIcon: (type: NotificationType, message: string) => void;
}

const actions = (handleClick: () => void) => [
  <Button onClick={handleClick}>Add to cart</Button>,
];

export function ProductCard({ product, openNotificationWithIcon }: Props) {
  const handleClick = async () => {
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
        openNotificationWithIcon('failed', 'Failed to add cart');
      }

      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Space direction="horizontal" size={16}>
      <Card
        title={product.name}
        actions={actions(handleClick)}
        style={{ width: 300 }}
      >
        <p>Price: {product.price}</p>
      </Card>
    </Space>
  );
}

export default ProductCard;
