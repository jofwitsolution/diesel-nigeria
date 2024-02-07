import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const DBSearchDistributor = () => {
  return (
    <div className="max-w-[19.0625rem]">
      <div
        className={`flex h-[2.375rem] items-center rounded-[5px] bg-light-900 pl-1`}
      >
        <div className="flex size-[2.375rem] items-center justify-center rounded-l-[0.5rem]">
          <Image
            src="/images/icons/search.svg"
            width={16.38}
            height={16.38}
            alt="search"
          />
        </div>
        <Input
          type="text"
          placeholder="Search for diesel sellers"
          className={`no-focus border-none  bg-transparent shadow-none outline-none placeholder:text-[0.9rem]`}
        />
      </div>
    </div>
  );
};

export default DBSearchDistributor;
