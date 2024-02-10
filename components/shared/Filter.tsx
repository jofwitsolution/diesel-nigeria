import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Filter = () => {
  return (
    <Button className="flex items-center gap-1 px-6 shadow-sm max-xs:px-3">
      <Image
        src="/images/icons/filter-small.svg"
        width={20}
        height={20}
        alt="filter"
      />
      <span className="text-[0.875rem] font-medium text-[#8A8A8A]">All</span>
      <Image
        src="/images/icons/down-fill.svg"
        width={15}
        height={7.5}
        alt="filter"
      />
    </Button>
  );
};

export default Filter;
