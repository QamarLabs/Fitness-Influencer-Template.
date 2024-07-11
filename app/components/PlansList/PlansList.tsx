import WixMediaImage from '@app/components/Image/WixMediaImage';
import testIds from '@app/utils/test-ids';
import { PlanInfoViewModel } from '@app/model/plans/plan.mapper';
import { formatCurrency } from '@app/utils/price-formtter';
import { useMemo } from 'react';

export default function PlansList({
  categoryId,
  plans,
}: {
  categoryId?: string;
  plans: PlanInfoViewModel[];
}) {
  return (
    <>
      {plans?.length ? (
        <div
          className="p-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          data-testid={testIds.PLAN_LIST.CONTAINER}
        >
          {plans.map((plan, index) => (
            <PlanCard plan={plan} key={plan.id} />
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

const PlanCard = ({ plan }: { plan: PlanInfoViewModel }) => {
  console.log('`${plan.info.price}`', `${plan.info.price}`);
  const formattedPrice = useMemo(
    () => formatCurrency(`${plan.info.price}`, 'USD'),
    [plan]
  );

  return (
    <div
      className="w-full rounded-none bg-white overflow-hidden mx-auto border border-white relative h-full min-h-[500px]"
      data-testid={testIds.PLAN_ITEM.CONTAINER}
    >
      {/* <a href={`/plans/${plan.info.slug}`}>
        <WixMediaImage
          media={service.info.media.mainMedia}
          width={640}
          height={480}
        />
      </a> */}
      <div className="px-6 py-4 text-center h-full flex flex-col justify-between items-center">
        <a
          href={`/plans/${plan.info.slug}`}
          className="font-bold text-xl mb-2 hover:text-gray-700"
        >
          {plan.info.name}
        </a>
        <div className="text-sm">
          <p className="my-3">{plan.info.description}</p>
        </div>
        <div className="text-left">
          <p className="text-md font-bold">Perks:</p>
          <hr />
          <div className="text-sm">
            {plan.info.perks &&
              plan.info.perks.length &&
              plan.info.perks.map((prk, prkIdx) => (
                <p className="leading-8" key={prkIdx}>
                  {prk}
                </p>
              ))}
          </div>
        </div>
        <div className="text-sm">
          <p className="font-bold leading-8">{formattedPrice}</p>
          <button
            className="btn-main w-full p-1 w-full sm:w-32"
            aria-disabled="false"
          >
            <span>Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
};
