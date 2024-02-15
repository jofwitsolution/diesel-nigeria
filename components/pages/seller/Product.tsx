"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

const Product = () => {
  return (
    <div className="flex w-full items-center justify-between gap-6 rounded-md bg-light-900 px-2 py-4 md:p-4">
      <div>
        <span className="font-medium lg:text-[1.125rem]">
          Diesel (Density 0.85g/ml)
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold lg:text-[1.125rem]">
          {formatPrice(1050)}
        </span>
        <Button className="border bg-primary-500 text-light-900 md:h-[2.375rem]">
          Update
        </Button>
        <span className="size-5 rounded-full bg-primary-500"></span>
        <Image
          src="/images/icons/menu-dot.svg"
          width={20}
          height={20}
          alt="menu"
        />
      </div>
    </div>
  );
};

export default Product;
