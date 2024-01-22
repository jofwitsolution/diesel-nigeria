import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="padding-top">
      <div className="max-width flex flex-col items-center gap-4">
        <h1 className="text-center font-fraunces text-[1.5rem] font-medium tracking-[-1px] text-dark-100 md:text-[2.25rem]">
          What Makes Us Stands Out
        </h1>
        <p className="mx-auto max-w-[61.5rem] text-center text-dark-500 md:text-[1.25rem] md:leading-[1.875rem]">
          We&apos;re not just a website; we are your indispensable partner.
          Whether you&apos;re a corporate organization, hotel, school, factory,
          event organizer, church, or home, our commitment is unwavering. We
          redefine the diesel procurement experience to elevate your operations
          to new heights.
        </p>
      </div>
      <div className="relative h-[52.4rem] w-full">
        <div className="absolute z-[2] flex size-full pt-[3rem]">
          <div className="relative hidden h-[20rem] w-full md:block">
            <div className="absolute left-[6%]">
              <Button className="feature-btn">Seamless Integration</Button>
            </div>
            <div className="absolute left-[66%] top-[3.25rem]">
              <Button className="feature-btn">Real-time Transactions</Button>
            </div>
            <div className="absolute left-[20%] top-[7.5rem]">
              <Button className="feature-btn">Transparent Tracking</Button>
            </div>
            <div className="absolute left-[50%] top-[13.5rem]">
              <Button className="feature-btn">Reliability</Button>
            </div>
          </div>
          <div className="relative top-[20rem] hidden h-[20rem] w-full md:block">
            <div className="absolute right-[70%]">
              <Button className="feature-btn">Official Sources</Button>
            </div>
            <div className="absolute right-[20%] top-[3.25rem]">
              <Button className="feature-btn">Real -time Market prices</Button>
            </div>
            <div className="absolute right-[73%] top-[7.5rem]">
              <Button className="feature-btn">Commercial Diesel Supply</Button>
            </div>
            <div className="absolute right-[22%] top-[13.5rem]">
              <Button className="feature-btn">Tank Farm Diesel Supply</Button>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-6 md:hidden">
            <div className="">
              <Button className="feature-btn-mobile">
                Seamless Integration
              </Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">
                Real-time Transactions
              </Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">
                Transparent Tracking
              </Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">Reliability</Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">Official Sources</Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">
                Real -time Market prices
              </Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">
                Commercial Diesel Supply
              </Button>
            </div>
            <div className="">
              <Button className="feature-btn-mobile">
                Tank Farm Diesel Supply
              </Button>
            </div>
          </div>
        </div>
        <Image
          src="/images/home/fuel-pump.png"
          alt="fuel pump"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default Features;
