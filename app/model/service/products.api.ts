import {
  mapProductInfo,
  ProductInfoViewModel,
} from '@app/model/service/product.mapper';
import { WixSession } from '../auth/auth';
import { safeCall } from '@app/model/utils';

export const safeGetProducts = (
  wixSession?: WixSession,
  { limit = 100 } = {}
) =>
  safeCall<{ products: ProductInfoViewModel[] }>(
    () => getProducts(wixSession, { limit }),
    { products: [] },
    'Query Services'
  );

export const getProducts = (
  wixSession?: WixSession,
  { limit = 100 } = {}
): Promise<{ products: ProductInfoViewModel[] }> => {
  let queryBuilder = wixSession!
    .wixClient!.products.queryProducts()
    .limit(limit);

  return queryBuilder.find().then((result) => {
    return {
      products:
        (result.items?.map(mapProductInfo) as ProductInfoViewModel[]) ?? [],
    };
  });
};

export const getProductBySlug = (
  wixSession: WixSession,
  productName: string
): Promise<{
  data: ProductInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<ProductInfoViewModel | null>(
    () =>
      wixSession
        .wixClient!.products.queryProducts()
        .eq('name', decodeURIComponent(productName))
        .find()
        .then((result) =>
          result.items?.length ? mapProductInfo(result.items[0]) : null
        ),
    null,
    'Get Service By Slug'
  );

export const getProductById = (
  wixSession: WixSession,
  productId: string
): Promise<{
  data: ProductInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<ProductInfoViewModel | null>(
    () =>
      wixSession
        .wixClient!.products.getProduct(productId)
        .then((productRes) => mapProductInfo(productRes.product!)),
    null,
    'Get Service By Id'
  );
