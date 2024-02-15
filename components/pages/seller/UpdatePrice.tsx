"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UpdatePrice = () => {
  return (
    <>
      <Link href="#">
        <Button className="bg-primary-500 px-[2.5625rem] py-[0.5625rem] text-light-900 hover:bg-primary-400">
          Update Price
        </Button>
      </Link>
    </>
  );
};

export default UpdatePrice;
