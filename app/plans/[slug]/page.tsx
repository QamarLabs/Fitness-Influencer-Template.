import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { maxWidthClassnames } from '@app/utils/tailwind-common-classes';
import { getPlanBySlug } from '@app/model/plans/plans.api';
import { PlanInfoViewModel } from '@app/model/plans/plan.mapper';
import { useMemo } from 'react';
import { formatCurrency } from '@app/utils/price-formtter';

export default async function ServicePage({ params }: any) {
  const wixSession = useServerAuthSession();
  const { data: plan } = params.slug
    ? await getPlanBySlug(wixSession, params.slug)
    : { data: null };

  return <PlanPageWithFallback plan={plan} />;
}

export function PlanPageWithFallback({
  plan,
}: {
  plan?: PlanInfoViewModel | null;
}) {
  return (
    <div className={`${maxWidthClassnames} mx-auto bg-white px-6 sm:px-28`}>
      {plan ? (
        <PlanPageView plan={plan} />
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The plan was not found
        </div>
      )}
    </div>
  );
}

function PlanPageView({ plan }: { plan: PlanInfoViewModel }) {
  const formattedPrice = useMemo(
    () => formatCurrency(plan.info.price, 'USD'),
    []
  );

  return (
    <div className="full-w rounded overflow-hidden max-w-7xl mx-auto">
      <div className="mt-14 mb-8 pb-8 border-b border-black w-full">
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
}
