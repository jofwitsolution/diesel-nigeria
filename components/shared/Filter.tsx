"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

interface Props {
  filters: { label: string; value: string }[];
  handleFilter: (filterTerm: string) => void;
  filterTerm: string;
}

const Filter = ({ filters, handleFilter, filterTerm }: Props) => {
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="" asChild>
          <Button className="flex items-center gap-1 px-6 shadow-sm max-xs:px-3">
            <Image
              src="/images/icons/filter-small.svg"
              width={20}
              height={20}
              alt="filter"
            />
            <span className="text-[0.875rem] font-medium capitalize text-[#8A8A8A]">
              {filterTerm === "" ? "all" : filterTerm}
            </span>
            <Image
              src="/images/icons/down-fill.svg"
              width={15}
              height={7.5}
              alt="filter"
            />
          </Button>
        </MenubarTrigger>
        <MenubarContent className="bg-light-900">
          {filters.map((filter) => (
            <MenubarItem
              key={filter.label}
              onClick={() => handleFilter(filter.value)}
              className={`${filterTerm === filter.value ? "border-r-2 border-primary-500 bg-primary-100" : ""}`}
            >
              {filter.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Filter;
