import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import Home, { Product } from '../components/Home/Home';
import styles from './index.module.css';

export function Index({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return <Home products={products} />;
}

export const getStaticProps = (async (context) => {
  let products = [];
  try {
    const res = await fetch('http://localhost:4000/api/products');
    products = await res.json();
  } catch (error) {
    console.error(error);
  }

  return { props: { products } };
}) satisfies GetStaticProps<{
  products: Product[];
}>;

export default Index;
