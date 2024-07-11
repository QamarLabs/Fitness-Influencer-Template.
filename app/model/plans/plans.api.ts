import { WixSession } from '../auth/auth';
import { safeCall } from '@app/model/utils';
import { mapPlanInfo, PlanInfoViewModel } from './plan.mapper';

export const safeGetPlans = (
  wixSession?: WixSession,
  { limit = 100 } = {}
) =>
  safeCall<{ plans: PlanInfoViewModel[] }>(
    () => getPlans(wixSession, { limit }),
    { plans: [] },
    'Query Plans'
  );

export const getPlans = (
  wixSession?: WixSession,
  { limit = 100 } = {}
): Promise<{ plans: PlanInfoViewModel[] }> => {
  let queryBuilder = wixSession!
    .wixClient!.plans.queryPublicPlans()
    .limit(limit);

  return queryBuilder.find().then((result) => {
    return {
      plans:
        (result.items?.map(mapPlanInfo) as PlanInfoViewModel[]) ?? [],
    };
  });
};

export const getPlanBySlug = (
  wixSession: WixSession,
  planSlug: string
): Promise<{
  data: PlanInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<PlanInfoViewModel | null>(
    () =>
      wixSession
        .wixClient!.plans.queryPublicPlans()
        .eq('slug', decodeURIComponent(planSlug))
        .find()
        .then((result) =>
          result.items?.length ? mapPlanInfo(result.items[0]) : null
        ),
    null,
    'Get Plan By Slug'
  );

export const getPlanById = (
  wixSession: WixSession,
  planId: string
): Promise<{
  data: PlanInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<PlanInfoViewModel | null>(
    () =>
      wixSession
        .wixClient!.plans.getPlan(planId)
        .then((planRes) => mapPlanInfo(planRes!)),
    null,
    'Get Plan By Id'
  );
