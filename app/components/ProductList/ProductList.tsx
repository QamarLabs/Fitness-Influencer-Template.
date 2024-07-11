import WixMediaImage from '@app/components/Image/WixMediaImage';
import testIds from '@app/utils/test-ids';
import { ProductInfoViewModel } from '@app/model/service/product.mapper';
import { useMemo } from 'react';
import { formatCurrency } from '@app/utils/price-formtter';

export default function ProductList({
  products,
}: {
  products: ProductInfoViewModel[];
}) {
  return (
    <>
      {products?.length ? (
        <div
          className="p-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          data-testid={testIds.SHOP_LIST.CONTAINER}
        >
          {products.map((product, index) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <>
          No productgs found. Click{' '}
          <a
            href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fbookings%2Fservices%2Ftemplates-catalog%3Forigin%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-turquoise-200"
          >
            here
          </a>{' '}
          to go to the business dashboard to add products. Once added, they will
          appear here.
        </>
      )}
    </>
  );
}

const ProductCard = ({ product }: { product: ProductInfoViewModel }) => {
  const formattedPrice = useMemo(() => formatCurrency(product.info.priceData!, "USD"), []);

  return (
    <div
      className="w-full rounded-none bg-white overflow-hidden mx-auto border border-white relative h-full min-h-[500px]"
      data-testid={testIds.SHOP_ITEM.CONTAINER}
    >
      <a href={`/service/${product.slug}`}>
        <WixMediaImage
          media={product.info.media.mainMedia!}
          width={640}
          height={480}
        />
      </a>
      <div className="px-6 py-4 text-center pb-20">
        <a
          href={`/service/${product.slug}`}
          className="font-bold text-xl mb-2 hover:text-gray-700"
        >
          {product.info.name}
        </a>
        <div className="text-sm">
          <p className="leading-8">{formattedPrice}</p>
        </div>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a
          href={`/calendar/${product.slug}`}
          className="btn-main"
          data-testid={testIds.SERVICE_ITEM.BOOK_NOW_CTA}
        >
          Book Now
        </a>
      </div>
    </div>
  );
};
