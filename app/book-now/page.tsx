import ServiceList from '@app/components/ServiceList/ServiceList';
import { safeGetServices } from '@app/model/service/service-api';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import testIds from '@app/utils/test-ids';
import { maxWidthClassnames } from '@app/utils/tailwind-common-classes';

export default async function BookNowPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const {
    data: { services },
  } = await safeGetServices(wixSession);
  return (
    <div className={`${maxWidthClassnames} mx-auto pb-8 px-5`}>
      <div className="pt-5 pb-12" data-testid={testIds.BOOK_NOW_PAGE.HEADER}>
        <div className="header-line my-8"></div>
        <h1 className="mb-7 mt-10 tracking-tighter">Services</h1>
      </div>
      <ServiceList services={services} />
    </div>
  );
}
