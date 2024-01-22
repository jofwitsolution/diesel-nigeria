import React from "react";
import SearchDistributor from "../../shared/search/SearchDistributor";
import DistributorTable from "../../shared/table/DistributorTable";

const Pricing = () => {
  return (
    <section className="max-width py-[2.1rem] md:pb-[4.25rem] md:pt-[3.25rem]">
      <h2 className="text-center font-fraunces text-[1.5rem] font-normal tracking-[-1px] text-dark-100 md:text-[2.25rem]">
        DIESEL (AGO) PRICE IN NIGERIA TODAY
      </h2>
      <div className="mt-[1rem] flex flex-col items-center">
        <span className="text-center text-[1.2rem] font-medium text-primary-500">
          Friday, January 19th, 2024
        </span>
        <span className="mt-[2.5rem] text-center font-fraunces text-[1.3rem] font-normal tracking-[-1px] text-dark-100 md:text-[1.5rem]">
          Find the best price that suits your needs
        </span>
        <p className="mt-[1rem] max-w-[67.875rem] text-center md:text-[1.25rem] md:leading-[1.9rem] ">
          After an order is received, our Matrix API can optimize the matching
          of delivery resources with actual delivery locations at scale. This
          capability is primarily leveraged by on-demand delivery companies, who
          appreciate the ability to understand traffic pattern impact on
          resource matching challenges.
        </p>
      </div>

      <div className="mx-auto mt-[2.5rem] flex flex-col items-center gap-[1.5rem] rounded-[1.25rem] md:bg-light-500 md:py-[1.6875rem] lg:w-[62.5rem] lg:px-[4.75rem]">
        <SearchDistributor
          inputStyle="text-dark-100"
          wrapperStyle="border border-light-600 bg-light-900"
        />
        <DistributorTable />
      </div>
    </section>
  );
};

export default Pricing;
