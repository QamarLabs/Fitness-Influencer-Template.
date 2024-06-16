import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import testIds from '@app/utils/test-ids';
import { safeGetProducts } from '@app/model/service/products.api';
import ProductList from '@app/components/ProductList/ProductList';

export default async function ShopPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const {
    data: { products },
  } = await safeGetProducts(wixSession);
  return (
    <div className="max-w-full-content mx-auto pb-8 px-5">
      <div className="pt-5 pb-12" data-testid={testIds.BOOK_NOW_PAGE.HEADER}>
        <div className="header-line my-8"></div>
        <h1 className="mb-7 mt-10 tracking-tighter">Shop</h1>
      </div>
      <ProductList products={products} />
    </div>
  );
}
