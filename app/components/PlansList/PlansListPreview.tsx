'use client';
import { PlanInfoViewModel } from '@app/model/plans/plan.mapper';
import { formatCurrency } from '@app/utils/price-formtter';
import { useMemo } from 'react';

export default function PlansListPreviewView({
  plans,
}: {
  plans: PlanInfoViewModel[];
}) {
  const smClassName = (plans?.length ?? 0) > 1 ? 'sm:grid-cols-2' : '';
  const mdClassName = (plans?.length ?? 0) > 2 ? 'md:grid-cols-3' : '';

  return plans?.length ? (
    <>
      <div
        className={`mx-auto flex flex-wrap my-3 m-auto grid grid-cols-1 gap-4 ${smClassName} ${mdClassName}`}
      >
        {plans?.map((plan, index) => (
          <PlanCardPreview plan={plan} key={plan.id} />
        ))}
      </div>
    </>
  ) : null;
}

const PlanCardPreview = ({ plan }: { plan: PlanInfoViewModel }) => {
  console.log('`${plan.info.price}`', `${plan.info.price}`);

  const formattedPrice = useMemo(
    () => formatCurrency(`${plan.info.price}`, 'USD'),
    [plan]
  );

  return (
    <div className="w-full rounded-none overflow-hidden mx-auto border-8 border-black relative h-full min-h-[300px]">
      <div className="p-6 pb-4 text-center h-full flex flex-col justify-between items-center">
        <a
          href={`/plans/${plan.info.slug}`}
          className="font-bold text-xl hover:text-gray-700"
        >
          {plan.info.name}
        </a>
        <p className="text-sm mt-2">{plan.info.description}</p>
        <div className="border-top border border-black w-full my-6"></div>
        <div className="h-[30%] flex flex-col justify-end items-center">
          <p className="text-gray-700 text-base mb-2">{formattedPrice}</p>
          <a className="btn-main font-body" href={`/plans/${plan.info.slug}`}>
            See Plan
          </a>
        </div>
      </div>
    </div>
  );
};
