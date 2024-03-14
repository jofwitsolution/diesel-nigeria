import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface Props {
  handleSearchInput: (input: string) => void;
  searchTerm: string;
  placeholder: string;
}

const Search = ({ handleSearchInput, searchTerm, placeholder }: Props) => {
  return (
    <div
      className={`flex h-[2.5rem] items-center  rounded-[0.5rem] bg-light-900 xl:h-[3.125rem]`}
    >
      <div className="flex size-[2.5rem] items-center justify-center rounded-l-[0.5rem] bg-primary-500 xl:size-[3.125rem]">
        <Image
          src="/images/icons/fuel-truck.svg"
          width={24}
          height={24}
          alt="fuel truck"
        />
      </div>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearchInput(e.target.value)}
        placeholder={placeholder}
        className={`no-focus w-full border-none  bg-transparent shadow-none outline-none placeholder:text-[0.9rem]`}
      />
    </div>
  );
};

export default Search;
