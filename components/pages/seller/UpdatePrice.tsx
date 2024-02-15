"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UpdatePrice = () => {
  return (
    <>
      <Link href="#">
        <Button className="bg-primary-500 text-light-900 hover:bg-primary-400 max-xs:h-[1.4rem] max-xs:text-[0.7rem] xs:px-[2.5625rem] xs:py-[0.5625rem]">
          Update Price
        </Button>
      </Link>
    </>
  );
};

export default UpdatePrice;
