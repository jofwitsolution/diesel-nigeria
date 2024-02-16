"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const Product = () => {
  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-md bg-light-900 p-3 max-xs:text-[0.8rem] md:p-4">
      <div>
        <span className="font-medium lg:text-[1.125rem]">
          Diesel (Density 0.85g/ml)
        </span>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <span className="font-semibold lg:text-[1.125rem]">
          {formatPrice(1050)}
        </span>
        <Button className="h-[1.8rem] w-[5rem] border bg-primary-500 text-light-900 md:h-[2.375rem]">
          Update
        </Button>
        <div className="size-5 shrink-0 rounded-full bg-primary-500 max-sm:size-2"></div>
        <div className="shrink-0 max-xs:mr-2">
          <Image
            src="/images/icons/menu-dot.svg"
            width={20}
            height={20}
            alt="menu"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
