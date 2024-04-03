import React from "react";
import MarketDistributorTable from "../../shared/table/MarketDistributorTable";
import { getCurrentDate } from "@/lib/utils";
import { getVerifiedSellers } from "@/lib/actions/user.action";

const Pricing = async () => {
  const result = await getVerifiedSellers();

  return (
    <section className="max-width py-[2.1rem] md:pb-[4.25rem] md:pt-[3.25rem]">
      <h2 className="text-center font-fraunces text-[1.5rem] font-normal tracking-[-1px] text-dark-100 md:text-[2.25rem]">
        DIESEL (AGO) PRICE IN NIGERIA TODAY
      </h2>
      <div className="mt-[1rem] flex flex-col items-center">
        <span className="text-center text-[1.2rem] font-medium text-primary-500">
          {getCurrentDate()}
        </span>
        <span className="mt-[2.5rem] text-center font-fraunces text-[1.3rem] font-normal tracking-[-1px] text-dark-100 md:text-[1.5rem]">
          Find the best price that suits your needs
        </span>
        <p className="mt-[1rem] max-w-[67.875rem] text-center md:text-[1.25rem] md:leading-[1.9rem] ">
          Once your order is confirmed, our advanced supply-chain and
          navigational system ensures you take delivery of your diesel, fast.
        </p>
      </div>

      <MarketDistributorTable sellers={result.sellers ?? []} />
    </section>
  );
};

export default Pricing;
