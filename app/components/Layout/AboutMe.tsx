import { minWidthClassnames } from '@app/utils/tailwind-common-classes';
import ScrollIntoView from '../ScrollIntoView/ScrollIntoView';

function AboutMe() {
  return (
    <div className="mt-10 lg:mt-[-175px]">
      <ScrollIntoView hashName="#about" offset="-128px" />
      <div
        className={`w-full bg-white h-full relative ${minWidthClassnames} pb-10`}
      >
        <div className="h-full">
          <div className="pl-5 py-2 pr-5 sm:w-2/4 sm:pr-24 sm:pr-0">
            <div className="header-line my-8"></div>
            <h2 className="font-body mb-7 mt-10 tracking-tighter max-w-xs title">
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
          </div>
        </div>
        <div className="w-full sm:absolute sm:top-0 sm:left-2/4 sm:w-2/4 h-full">
          <div className="bg-[url('/about-me.jpg')] w-full h-full bg-cover bg-center min-h-[320px]"></div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;