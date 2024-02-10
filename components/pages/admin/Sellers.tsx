import React from "react";
import Search from "@/components/shared/search/Search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ExportAs from "@/components/shared/ExportAs";
import Filter from "@/components/shared/Filter";
import AdminSellersTable from "@/components/shared/table/AdminSellersTable";

const Sellers = () => {
  return (
    <div className="max-w-[68.5625rem] space-y-6">
      <div className="xL:gap-12 flex flex-wrap justify-between gap-6">
        <div className="xl:w-[22.8125rem]">
          <Search placeholder="Search for a distributor" />
        </div>
        <div className="flex gap-4 max-sm:flex-wrap max-sm:gap-2">
          <Filter />
          <ExportAs />
          <Button className="space-x-2 bg-primary-500 px-6 font-[600] text-light-900 max-xs:px-3">
            <Image
              src="/images/icons/plus.svg"
              width={15}
              height={15}
              alt="add"
            />{" "}
            <span>Add New Seller</span>
          </Button>
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
        <AdminSellersTable />
      </div>
    </div>
  );
};

export default Sellers;
