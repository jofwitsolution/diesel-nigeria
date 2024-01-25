import ContactGoogleMap from "@/components/ContactGoogleMap";
import ContactBoard from "@/components/shared/ContactBoard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="max-width py-[4rem] md:py-[8rem]">
        <section className="text-[#262626]">
          <h1 className="text-center text-[1.57rem] leading-[2.4rem]">
            Contact Us
          </h1>
          <div className="mt-8 flex flex-col gap-4 border-b-4 border-[rgba(38,38,38,0.10)] pb-5 font-fraunces text-[1.6rem] leading-[2rem] xs:text-[2rem] xs:leading-[2rem] md:pb-8 md:text-[3.5rem] md:leading-[3.8rem]">
            <Link
              href="tel: 2349031105298"
              className="text-center hover:text-primary-500"
            >
              234-903-110-5298
            </Link>
            <Link
              href="tel: hello@dieselng.com"
              className="text-center hover:text-primary-500"
            >
              hello@dieselng.com
            </Link>
            <span className="text-center">
              40 Adaranijo St, Somolu 102216, Lagos
            </span>
          </div>
          <div className="mt-8 flex flex-col items-center gap-6 md:mt-12 md:gap-8">
            <span className="max-w-[46rem] text-center font-fraunces text-[1.6rem] leading-[2rem] xs:text-[2rem] xs:leading-[2rem] md:text-[3.5rem] md:leading-[3.8rem]">
              A Diesel Seller? Want Your Price listed?
            </span>
            <Link href="/" className="">
              <Button className="flex w-[11.0625rem] items-center justify-center rounded-[62.4375rem] bg-[#FFDE59] font-medium hover:bg-[#FFDE01] hover:text-light-900">
                Register Here
              </Button>
            </Link>
          </div>
        </section>
        <section className="mt-16">
          <ContactGoogleMap />
        </section>
      </div>
      <ContactBoard />
    </>
  );
};

export default Page;
