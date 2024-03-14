"use client";

import React, { useState } from "react";
import Search from "@/components/shared/search/Search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ExportAs from "@/components/shared/ExportAs";
import Filter from "@/components/shared/Filter";
import AdminBuyersTable from "@/components/shared/table/AdminBuyersTable";
import { userFilters } from "@/constants";

const Buyers = ({ buyers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("All");
  const [currentFilter, setCurrentFilter] = useState("");

  const handleSearchInput = (input: string) => {
    setSearchTerm(input);
    setCurrentFilter(input);
  };

  const handleFilter = (input: string) => {
    setSearchTerm("");
    setFilterTerm(input);
    setCurrentFilter(input);
  };

  return (
    <>
      <div className="max-w-[68.5625rem] space-y-6">
        <div className="xL:gap-12 flex flex-wrap justify-between gap-6">
          <div className="xl:w-[22.8125rem]">
            <Search
              handleSearchInput={handleSearchInput}
              searchTerm={searchTerm}
              placeholder="Search buyers"
            />
          </div>
          <div className="flex gap-4 max-sm:flex-wrap max-sm:gap-2">
            <Filter
              filters={userFilters}
              handleFilter={handleFilter}
              filterTerm={filterTerm}
            />
            <ExportAs />
            <Button className="space-x-2 px-6 font-[600] shadow-sm max-xs:px-3">
              <Image
                src="/images/icons/refresh.svg"
                width={16.67}
                height={11.67}
                alt="refresh"
              />{" "}
              <span>Refresh</span>
            </Button>
          </div>
        </div>
        <div>
          <AdminBuyersTable currentFilter={currentFilter} buyers={buyers} />
        </div>
      </div>
    </>
  );
};

export default Buyers;
