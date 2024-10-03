import styles from './ProductCard.module.css';
import { Card, Space } from 'antd';

interface Props {
  name: string;
  description: string;
  price: number;
  stockQty: number;
}

export function ProductCard({ name, price, description }: Props) {
  return (
    <Space direction="horizontal" size={16}>
      <Card
        title={name}
        extra={<a href="#">Add to cart</a>}
        style={{ width: 300 }}
      >
        <p>Price: {price}</p>
        <p>{description}</p>
      </Card>
    </Space>
  );
}

export default ProductCard;
