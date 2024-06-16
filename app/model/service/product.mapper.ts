import { formatDuration, intervalToDuration } from 'date-fns';
import { products } from '@wix/stores';
import { mapServiceOfferedAsDto } from '@app/model/service/service-offered-as.mapper';
import { mapServicePaymentDto } from '@app/model/service/service-payment.mapper';

export type ProductInfoViewModel = NonNullable<
  ReturnType<typeof mapProductInfo>
>;

export type ProductImage = products.MediaItem;

export function mapProductInfo(product?: products.Product) {
  if (!product) {
    return null;
  }
  let mainMedia = product?.media?.mainMedia ?? product?.media?.items?.[0];
  let coverMedia = product?.media?.mainMedia ?? product?.media?.items?.[0];
  let otherMediaItems = product?.media?.items?.filter((item) => !!item) as
    | ProductImage[]
    | undefined;
  const { name, description, convertedPriceData, visible, _id: id, slug } = product;
  return {
    id,
    info: {
      name,
      description,
      media: {
        mainMedia,
        otherMediaItems,
        coverMedia,
      },
      priceData:
        convertedPriceData && convertedPriceData.discountedPrice
          ? `${
              convertedPriceData.discountedPrice + " " + convertedPriceData.currency!
            }`
          : `${convertedPriceData?.price + " " + convertedPriceData?.currency!}`,
    },
    slug,
    visible,
  };
}
