import Businesses from "@/components/shared/Businesses";
import ContactBoard from "@/components/shared/ContactBoard";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="max-width pt-[2.1rem] md:pt-[3.25rem]">
        <section className="padding-bottom">
          <h1 className="mx-auto max-w-[50.8125rem] text-center font-fraunces text-[1.5rem] font-normal leading-[2.2rem] md:text-[3rem] md:leading-[3.5rem]">
            Finding An Efficient Diesel Solution For Nigerian Businesses Is Our
            Ultimate Goal!
          </h1>
          <p className="mx-auto mt-[1.25rem] max-w-[55.9375rem] text-center font-medium text-[#505050] md:mt-[2.5rem] md:text-[1.25rem] md:leading-[1.99rem]">
            At DieselNg.com, we are your go-to source for the most up-to-date
            diesel (AGO) depot prices in Nigeria. We understand the importance
            of timely and accurate information for businesses, given the highly
            volatile diesel pricing, and we update our info with a time-gap of 2
            hours daily.
          </p>
          <div className="mx-auto mt-[2rem] max-w-[66rem] md:mt-[3.3125rem]">
            <Image
              src="/images/about/diesel.png"
              width={1056}
              height={521.86}
              alt="diesel"
              className="object-cover"
            />
          </div>
        </section>
        <section className="padding-top padding-bottom mx-auto max-w-[77.1875rem]">
          <div className="flex w-full flex-col items-center gap-8 md:flex-row">
            <div>
              <h2 className="mb-[0.8rem] font-fraunces text-[1.5rem] md:text-[3rem] md:leading-[3.25rem]">
                Reliable Official Sources
              </h2>
              <p className="max-w-[32.75rem] font-medium md:leading-[1.75rem]">
                We source our diesel price information from reliable official
                channels, guaranteeing that the data you receive is trustworthy
                and reflective of the current market conditions
              </p>
            </div>
            <div>
              <Image
                src="/images/about/filling.png"
                width={619}
                height={442}
                alt="filling"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="mt-[2.5rem] flex w-full flex-col-reverse items-center gap-8 md:mt-[5rem] md:flex-row">
            <div>
              <Image
                src="/images/about/tanker.png"
                width={623}
                height={446}
                alt="filling"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="mb-[0.8rem] font-fraunces text-[1.5rem] md:text-[3rem] md:leading-[3.25rem]">
                Fast and Tracked Delivery
              </h2>
              <p className="max-w-[32.75rem] font-medium md:leading-[1.75rem]">
                We have deployed a fleet of delivery vehicles manned by trained
                drivers aided by tech navigational and tracking tools, to ensure
                last-mile retail deliveries to the customer locations.
              </p>
            </div>
          </div>
        </section>
        <section className="padding-top padding-bottom">
          <div className="flex flex-wrap gap-[2.5rem]">
            <div className="md:max-w-[27.4375rem]">
              <h3 className="mb-[0.8rem] font-fraunces text-[1.35rem] md:text-[1.5rem]">
                Efficient Diesel Transactions for Corporates
              </h3>
              <p className="font-medium md:leading-[1.75rem]">
                Are you a corporate entity looking to streamline your diesel
                procurement process? Our unique advantage lies in connecting you
                with a select group of trusted suppliers on our platform,
                ensuring quick delivery and reducing the need for extensive
                storage as well as exposure to unethical/ inefficient
                transactions
              </p>
            </div>
            <div className="md:max-w-[24.25rem]">
              <h3 className="mb-[0.8rem] font-fraunces text-[1.35rem] md:text-[1.5rem]">
                Industry Expertise at Your Service
              </h3>
              <p className="font-medium md:leading-[1.75rem]">
                Prompted by the need to bring efficiency to diesel transactions
                in Nigeria, our team comprises industry experts dedicated to
                revolutionizing the way you buy diesel. We understand the value
                of speed, transparency, and reliability in your operations, and
                we’ve built our platform with these principles at its core
              </p>
            </div>
            <div className="md:max-w-[24.25rem]">
              <h3 className="mb-[0.8rem] font-fraunces text-[1.35rem] md:text-[1.5rem]">
                Fast, Transparent, and Reliable Service
              </h3>
              <p className="font-medium md:leading-[1.75rem]">
                DieselNg.com is more than a platform; it’s a commitment to
                providing a fast, transparent, and reliable service. Our mission
                is to simplify diesel transactions for executives conscious of
                their value-for-money, ensuring that the process is
                straightforward and efficient.
              </p>
            </div>
          </div>
          {/* Display on large upward */}
          <div className="relative mt-8 h-[50rem] max-lg:hidden md:mt-12">
            <Image
              src="/images/about/img-1.png"
              width={516}
              height={650.21}
              alt="fueling"
              className="absolute top-0 z-[20] object-cover"
            />
            <div className="relative left-[24%] top-[11rem] h-[35.6875rem] w-[75%]">
              <Image
                src="/images/about/img-2.png"
                fill
                alt="refinery"
                className="object-scale-down"
              />
            </div>
          </div>
          {/* Display on large downward */}
          <div className="mt-8 md:mt-12 lg:hidden">
            <Image
              src="/images/about/img-2.png"
              width={948}
              height={571.5}
              alt="refinery"
              className="object-scale-down"
            />
          </div>
        </section>
        <section className="padding-top padding-bottom">
          <h4 className="mx-auto mb-8 max-w-[50.25rem] text-center font-fraunces text-[1.5rem] md:mb-[3.25rem] md:text-[3rem] md:leading-[3.25rem] ">
            Numbers matter & here numbers speak for themselves
          </h4>
          <div className="flex flex-wrap justify-center gap-[1.5rem]">
            <div className="numbers-card">
              <span className="numbers-card-number">1,250</span>
              <span className="">Avg. daily site visitors</span>
            </div>
            <div className="numbers-card">
              <span className="numbers-card-number">20</span>
              <span className="">AGO supply partners</span>
            </div>
            <div className="numbers-card">
              <span className="numbers-card-number">56</span>
              <span className="">Consumers serviced</span>
            </div>
          </div>
        </section>
      </div>
      <Businesses />
      <ContactBoard />
    </>
  );
};

export default Page;
