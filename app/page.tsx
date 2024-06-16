import './page.css';
import ServiceListPreview from '@app/components/ServiceList/ServiceListPreview';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetServices } from '@app/model/service/service-api';
import testIds from '@app/utils/test-ids';
import { minWidthClassnames, responsiveFlexDirection } from './utils/tailwind-common-classes';

export default async function Home() {
  const wixSession = useServerAuthSession();
  const {
    data: { services },
  } = await safeGetServices(wixSession, { limit: 3 });
  
  return (
    <>
      <div className={`lg:min-h-screen relative flex ${responsiveFlexDirection} items-center ${minWidthClassnames}`}>
        <div className="relative z-10 w-full md:h-96 lg:w-1/2 pl-6 md:pl-12 text-black flex flex-col justify-center">
          <div className="font-sans font-bold uppercase tracking-widest">
            Straight Path to the Body of your Dreams
          </div>
          <div className="text-xl pt-6 tracking-wider">
            Now Available for Coaching
          </div>
          <div className="pt-7 md:absolute md:bottom-10">
            <a
              className="btn-main"
              href="/book-now"
              data-testid={testIds.HOME_PAGE.BOOK_NOW_CTA}
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="inset-0 w-full lg:w-1/2 flex items-center justify-center overflow-hidden">
          <picture className="h-64 md:h-full">
            <source
              sizes="(max-width: 2170px) 100vw, 2170px"
              srcSet=" 
                mustaqim-photos/hero-image/w_190.png 190w,
                mustaqim-photos/hero-image/w_477.png 477w,
                mustaqim-photos/hero-image/w_686.png 686w,
                mustaqim-photos/hero-image/w_849.png 849w,
                mustaqim-photos/hero-image/w_866.png 866w,
                mustaqim-photos/hero-image/w_1317.png 1317w,
                mustaqim-photos/hero-image/w_1342.png 1342w,
                mustaqim-photos/hero-image/w_1448.png 1448w,
                mustaqim-photos/hero-image/w_1525.png 1525w,
                mustaqim-photos/hero-image/w_1626.png 1626w,
                mustaqim-photos/hero-image/w_1691.png 1691w,
                mustaqim-photos/hero-image/w_1753.png 1753w,
                mustaqim-photos/hero-image/w_1936.png 1936w,
                mustaqim-photos/hero-image/w_1997.png 1997w,
                mustaqim-photos/hero-image/w_2043.png 2043w,
                mustaqim-photos/hero-image/w_2146.png 2146w,
                mustaqim-photos/hero-image/w_2104.png 2104w,
                mustaqim-photos/hero-image/w_2170.png 2170w"
              src="mustaqim-photos/hero-image/w_2170.png"
            />
            <img
              className="max-w-none h-96 object-top lg:max-w-full lg:h-full lg:w-auto sm:scale-105 lg:scale-150"
              src="mustaqim/w_1400.png"
              alt="Fitness Goals"
              style={{ mixBlendMode: 'luminosity' }}
            />
          </picture>
        </div>
      </div>

      <div className="mt-10 lg:mt-[-175px]">
        <ScrollIntoView hashName="#about" offset="-128px" />
        <div className={`w-full bg-white h-full relative ${minWidthClassnames}`}>
          <div className="h-full">
            <div className="pl-5 py-2 pr-5 sm:w-2/4 sm:pr-24 sm:pr-0">
              <div className="header-line my-8"></div>
              <h2 className="mb-7 mt-10 tracking-tighter max-w-xs title">
                About me
              </h2>
              <p className="text-sm flex-1 leading-7">
                {`
                My name is Mustaqeem Abdullah, and I am a dedicated Muslim fitness influencer and personal coach. 
                My mission is to assist individuals in identifying and overcoming obstacles in their fitness journeys while maximizing their physical and mental potential. 
                Through my personalized fitness consulting services, I help clients set achievable fitness goals, build the confidence and skills needed to attain success, and cultivate a positive mindset and a sense of self-worth. 
                Whether you're looking to improve your overall health, build strength, or achieve specific fitness milestones, I am here to support and guide you every step of the way.
              `}
              </p>
              <div className="mt-11 mb-20">
                <a href="/about-me" className="btn-main">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="w-full sm:absolute sm:top-0 sm:left-2/4 sm:w-2/4 h-full">
            <div className="bg-[url('/about-me.jpeg')] w-full h-full bg-cover min-h-[320px]"></div>
          </div>
        </div>
      </div>
      <div className="parallax-background">
        {services?.length ? (
          <div
            className="bg-transparent p-5"
            data-testid={testIds.HOME_PAGE.SERVICES_SECTION}
          >
            <div className="header-line my-8"></div>
            <h2 className="mb-7 mt-10 tracking-tighter title max-w-xs">
              How I Can Help You
            </h2>

            <>
              <ServiceListPreview services={services} />
              <div className="flex my-8 justify-center">
                <a className="btn-main" href="/book-now">
                  More Services
                </a>
              </div>
            </>
          </div>
        ) : null}
      </div>
    </>
  );
}
