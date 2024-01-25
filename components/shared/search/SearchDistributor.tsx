import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Props {
  inputStyle: string;
  wrapperStyle: string;
}

const SearchDistributor = ({ inputStyle, wrapperStyle }: Props) => {
  return (
    <div className="relative w-full max-w-[40.9375rem]">
      <div
        className={`${wrapperStyle} flex h-[3.125rem] items-center rounded-[0.5rem]`}
      >
        <div className="flex size-[3.125rem] items-center justify-center rounded-l-[0.5rem] bg-primary-500">
          <Image
            src="/images/icons/fuel-truck.svg"
            width={24}
            height={24}
            alt="fuel truck"
          />
        </div>
        <Input
          type="text"
          placeholder="Search for a distributor, state"
          className={`${inputStyle} no-focus border-none  bg-transparent shadow-none outline-none placeholder:text-[0.9rem]`}
        />
      </div>
    </div>
  );
};

export default SearchDistributor;
