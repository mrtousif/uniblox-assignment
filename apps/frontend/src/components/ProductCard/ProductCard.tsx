import { Product } from '../Home/Home';
import styles from './ProductCard.module.css';
import { Button, Card, Space } from 'antd';

interface Props {
  product: Product;
  handleClick: (product: Product) => void;
}

const actions = (handleClick: (product: Product) => void, product: Product) => [
  <Button onClick={() => handleClick(product)}>Add to cart</Button>,
];

export function ProductCard({ product, handleClick }: Props) {
  return (
    <Space direction="horizontal" size={16}>
      <Card
        title={product.name}
        actions={actions(handleClick, product)}
        style={{ width: 300 }}
      >
        <p>Price: {product.price}</p>
      </Card>
    </Space>
  );
}

export default ProductCard;
