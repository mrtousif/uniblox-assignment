import ProductCard from '../ProductCard/ProductCard';
import { Col, Divider, Row } from 'antd';

export interface Product {
  id: string;
  name: string;
  stockQty: number;
  price: number;
}

interface Props {
  products: Product[];
}
export function Home({ products }: Props) {
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col
            className="gutter-row"
            span={4}
            key={product.name + product.price}
          >
            <ProductCard
              name={product.name}
              stockQty={product.stockQty}
              price={product.price}
              description=""
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
