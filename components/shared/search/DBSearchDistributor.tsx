"use client";

import React, { SyntheticEvent } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DBSearchDistributor = () => {
  const router = useRouter();

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((e.target as HTMLFormElement).search.value) {
      router.push(
        `/buyer/sellers?keyword=${(e.target as HTMLFormElement).search.value}`
      );
    }
  };
  return (
    <div className="max-w-[19.0625rem]">
      <form
        onSubmit={handleSearch}
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
          name="search"
          placeholder="Search for diesel sellers"
          className={`no-focus border-none  bg-transparent shadow-none outline-none placeholder:text-[0.9rem]`}
        />
      </form>
    </div>
  );
};

export default DBSearchDistributor;
