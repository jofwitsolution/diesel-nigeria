"use client";

import Image from "next/image";
import React from "react";
import DBMobileNav from "./DBMobileNav";
import { useCurrentRole } from "@/hooks/user";

const DBNavbar = () => {
  const role = useCurrentRole();

  return (
    <div className="fixed inset-x-0 top-0 bg-light-900">
      <div className="h-[3.375rem] bg-white px-4 md:ml-[4rem] lg:ml-[15.0625rem]">
        <div className="flex size-full items-center justify-between">
          <h1 className="font-semibold capitalize md:text-[1.125rem]">
            {role}- Dashboard
          </h1>
          <div className="flex gap-[1.5rem]">
            <Image
              src="/images/icons/bell.svg"
              width={20}
              height={20}
              alt="notification bell"
            />
            <DBMobileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBNavbar;
