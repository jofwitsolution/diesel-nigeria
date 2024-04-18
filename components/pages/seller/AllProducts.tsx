"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Product from "./Product";
import AddProductForm from "@/components/forms/AddProductForm";
import { Product as ProductModel } from "@prisma/client";

interface Props {
  products: ProductModel[];
}

const AllProducts = ({ products }: Props) => {
  const [addDialogState, setAddDialogState] = useState(false);

  return (
    <>
      <div className="w-full space-y-6">
        <div className="flex w-full justify-end">
          <Button
            onClick={() => setAddDialogState(true)}
            className="h-[2.375rem] border border-primary-500 px-6 font-[700] text-primary-500"
          >
            Add Diesel
          </Button>
        </div>
        <div className="flex w-full flex-col gap-3">
          {products?.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-4 rounded-md bg-light-900 p-3 max-xs:text-[0.8rem] md:p-4">
              <span className="font-[600] md:text-[18px]">No Products</span>
              <span>Please add a product</span>
            </div>
          ) : (
            <>
              {products?.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
      <AddProductForm
        addDialogState={addDialogState}
        handleDialogState={() => setAddDialogState(!addDialogState)}
      />
    </>
  );
};

export default AllProducts;
