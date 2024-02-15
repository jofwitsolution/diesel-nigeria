import React from "react";
import { Button } from "@/components/ui/button";
import Product from "./Product";

const AllProducts = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full justify-end">
        <Button className="h-[2.375rem] border border-primary-500 px-6 font-[700] text-primary-500">
          Add Diesel
        </Button>
      </div>
      <div className="flex w-full flex-col gap-3">
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default AllProducts;
