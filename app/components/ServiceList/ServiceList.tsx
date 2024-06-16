import WixMediaImage from '@app/components/Image/WixMediaImage';
import { ServiceInfoViewModel } from '@app/model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';
import testIds from '@app/utils/test-ids';

const ALL_SERVICES_CATEGORY_ID = 'ALL';

export default function ServiceList({
  categoryId,
  services,
}: {
  categoryId?: string;
  services: ServiceInfoViewModel[];
}) {
  const selectedCategoryId = categoryId ?? ALL_SERVICES_CATEGORY_ID;
  const servicesToDisplay = services.filter(
    (service) => selectedCategoryId === ALL_SERVICES_CATEGORY_ID
  );

  return (
    <>
      {servicesToDisplay?.length ? (
        <div
          className="p-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          data-testid={testIds.SERVICE_LIST.CONTAINER}
        >
          {servicesToDisplay.map((service, index) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      ) : (
        <>
          No services found. Click{' '}
          <a
            href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fbookings%2Fservices%2Ftemplates-catalog%3Forigin%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-turquoise-200"
          >
            here
          </a>{' '}
          to go to the business dashboard to add services. Once added, they will
          appear here.
        </>
      )}
    </>
  );
}

const ServiceCard = ({ service }: { service: ServiceInfoViewModel }) => {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div
      className="w-full rounded-none bg-white overflow-hidden mx-auto border border-white relative h-full min-h-[500px]"
      data-testid={testIds.SERVICE_ITEM.CONTAINER}
    >
      <a href={`/service/${service.slug}`}>
        <WixMediaImage
          media={service.info.media.mainMedia}
          width={640}
          height={480}
        />
      </a>
      <div className="px-6 py-4 text-center pb-20">
        <a
          href={`/service/${service.slug}`}
          className="font-bold text-xl mb-2 hover:text-gray-700"
        >
          {service.info.name}
        </a>
        <div className="text-sm">
          <p className="my-3">{service.info.tagLine}</p>
          <p className="leading-8">{service.info.formattedDuration}</p>
          <p className="leading-8">{formattedPrice.userFormattedPrice}</p>
        </div>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a
          href={`/calendar/${service.slug}`}
          className="btn-main"
          data-testid={testIds.SERVICE_ITEM.BOOK_NOW_CTA}
        >
          Book Now
        </a>
      </div>
    </div>
  );
};
