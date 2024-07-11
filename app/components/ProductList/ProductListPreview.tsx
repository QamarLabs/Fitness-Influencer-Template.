'use client';
import { ProductInfoViewModel } from '@app/model/service/product.mapper';
import { formatCurrency } from '@app/utils/price-formtter';
import { useMemo } from 'react';

export default function ProductListPreview({
  products,
}: {
  products: ProductInfoViewModel[];
}) {
  const smClassName = (products?.length ?? 0) > 1 ? 'sm:grid-cols-2' : '';
  const mdClassName = (products?.length ?? 0) > 2 ? 'md:grid-cols-3' : '';

  return products?.length ? (
    <>
      <div
        className={`mx-auto flex flex-wrap my-3 m-auto grid grid-cols-1 gap-4 ${smClassName} ${mdClassName}`}
      >
        {products?.map((product, index) => (
          <ProductCardPreview product={product} key={product.id} />
        ))}
      </div>
    </>
  ) : null;
}

const ProductCardPreview = ({ product }: { product: ProductInfoViewModel }) => {
  const formattedPrice = useMemo(() => formatCurrency(product.info.priceData!, "USD"), []);

  return (
    <div className="w-full rounded-none overflow-hidden mx-auto border-8 border-black relative h-full min-h-[300px]">
      <div className="p-6 pb-20 text-center h-full">
        <a
          href={`/service/${product.slug}`}
          className="font-bold text-xl hover:text-gray-700"
        >
          {product.info.name}
        </a>
        <div className="border-top border border-black w-full my-6"></div>
        <p className="text-gray-700 text-base">
          {formattedPrice}
        </p>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a href={`/calendar/${product.slug}`} className="btn-main">
          Buy Product
        </a>
      </div>
    </div>
  );
};
