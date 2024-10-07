import { GetStaticProps, InferGetStaticPropsType } from 'next/types';
import Home, { Product } from '../components/Home/Home';
import AppLayout from '../components/Layout/Layout';
import { API_URL } from '../contants';

export function Index({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout>
      <Home products={products} />;
    </AppLayout>
  );
}

export const getStaticProps = (async (context) => {
  let products = [];
  try {
    const res = await fetch(API_URL + '/products');
    products = await res.json();
  } catch (error) {
    console.error(error);
  }

  return { props: { products } };
}) satisfies GetStaticProps<{
  products: Product[];
}>;

export default Index;
