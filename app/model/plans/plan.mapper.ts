import { plans } from '@wix/pricing-plans';

export type PlanInfoViewModel = NonNullable<ReturnType<typeof mapPlanInfo>>;

export function mapPlanInfo(plan?: plans.Plan) {
  if (!plan) {
    return null;
  }

  const {
    name,
    description,
    termsAndConditions,
    perks,
    buyerCanCancel,
    pricing,
    _id: id,
    slug,
  } = plan;

  return {
    id,
    info: {
      name,
      description,
      perks: perks?.values,
      buyerCanCancel,
      termsAndConditions,
      price:
        pricing && pricing.price
          ? pricing.price.value
          : "0",
      slug,
    },
  };
}
