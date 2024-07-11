import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import testIds from '@app/utils/test-ids';
import { maxWidthClassnames } from '@app/utils/tailwind-common-classes';
import PlansList from '@app/components/PlansList/PlansList';
import { safeGetPlans } from '@app/model/plans/plans.api';

export default async function BookNowPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const {
    data: { plans },
  } = await safeGetPlans(wixSession);
  return (
    <div className={`${maxWidthClassnames} mx-auto pb-8 px-5`}>
      <div className="pt-5 pb-12" data-testid={testIds.PLANS_PAGE.HEADER}>
        <div className="header-line my-8"></div>
        <h1 className="mb-7 mt-10 tracking-tighter">Plans</h1>
      </div>
      <PlansList plans={plans} />
    </div>
  );
}
