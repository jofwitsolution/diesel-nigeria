import Image from "next/image";
import React from "react";
import Link from "next/link";
import HomeDistributorTable from "../../shared/table/HomeDistributorTable";
import { Button } from "@/components/ui/button";
import { getCurrentDate } from "@/lib/utils";
import { getVerifiedSellers } from "@/lib/actions/user.action";

const HomeHero = async () => {
  const result = await getVerifiedSellers();

  return (
    <header className="max-width py-[2.1rem] md:py-[3.25rem]">
      <section className="static w-full sm:relative sm:min-h-[77rem]">
        <div className="static flex items-center justify-center rounded-[3.5rem] opacity-[0.9] sm:absolute sm:z-[2] sm:size-full sm:bg-dark-gradient">
          <div className="flex flex-col items-center gap-[2.3125rem] px-[1rem]">
            <h1 className="mx-auto max-w-[44.5rem] text-center font-fraunces text-[1.6rem] font-normal leading-[2.5rem] tracking-[-1px] text-dark-100 sm:text-light-900 md:text-[3.04rem] md:leading-[3rem]">
              Welcome to the Future of Diesel Procurement!
            </h1>
            <span className="text-center text-[1.2rem] font-medium text-primary-500">
              {getCurrentDate()}
            </span>
            <div className="mx-auto flex max-w-[40.9375rem] flex-col items-center gap-[1.5rem] bg-transparent">
              <HomeDistributorTable sellers={result.sellers ?? []} />
            </div>
            <span className="text-center text-[1.125rem] font-medium sm:text-light-900">
              Manage, Order, Sell and Track your Diesel like Never Before{" "}
            </span>

            <p className="mx-auto max-w-[44.9375rem] text-center text-[1.125rem] sm:text-light-500">
              Bridging the Information and logistical gap between AGO suppliers
              and the consumers, with accuracy and efficiency
            </p>

            <Link href="/market" className="sm:hidden">
              <Button className="flex w-[11.0625rem] items-center justify-center rounded-[62.4375rem] bg-primary-500 text-light-900 hover:bg-primary-400">
                market
              </Button>
            </Link>
          </div>
        </div>

        <Image
          src="/images/home/hero.png"
          alt="hero bg"
          fill
          className="rounded-[3.5rem] object-cover max-sm:hidden"
        />
      </section>
    </header>
  );
};

export default HomeHero;
