import { ProductImage } from '@app/model/service/product.mapper';
import { ServiceImage } from '@app/model/service/service.mapper';
import { media as wixMedia } from '@wix/sdk';

// Type guard to check if media is of type ServiceImage
function isServiceImage(media: any): media is ServiceImage {
  return (media as ServiceImage).image !== undefined;
}

// Type guard to check if media is of type ProductImage
function isProductImage(media: any): media is ProductImage {
  return (media as ProductImage).image !== undefined && 'url' in media;
}

export const getImageUrlForMedia = (
  media?: any,
  width: number = 640,
  height: number = 320
) => {
  return media && media.image
    ? media.image.url
      ? wixMedia.getScaledToFillImageUrl(media.image.url!, width, height, {})
      : wixMedia.getScaledToFillImageUrl(media.image!, width, height, {})
    : `https://fakeimg.pl/${width}x${height}/?text=%20`;
};

export default function WixMediaImage({
  media,
  width = 640,
  height = 320,
}: {
  media?: ServiceImage | ProductImage;
  width?: number;
  height?: number;
}) {
  const imageUrl = getImageUrlForMedia(media, width, height);
  return (
    <div className="flex items-center justify-center ">
      <div className="overflow-hidden  cursor-pointer relative group">
        <img
          className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out "
          src={imageUrl}
          alt={''}
        />
      </div>
    </div>
  );
}
