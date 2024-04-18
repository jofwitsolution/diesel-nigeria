import React from "react";
import AllProducts from "@/components/pages/seller/AllProducts";
import { getSellerProducts } from "@/lib/actions/product.action";

const ProductsPage = async () => {
  const result = await getSellerProducts();

  return (
    <div className="max-w-[72.1875rem]">
      <AllProducts products={result.products! ?? []} />
    </div>
  );
};

export default ProductsPage;
