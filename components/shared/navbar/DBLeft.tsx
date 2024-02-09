"use client";

import React from "react";
import { useCurrentRole } from "@/hooks/user";
import { adminNavLinks, buyerNavLinks, sellerNavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth.action";

const DBLeft = () => {
  const role = useCurrentRole();
  const pathname = usePathname();

  const navLinks = {
    admin: adminNavLinks,
    seller: sellerNavLinks,
    buyer: buyerNavLinks,
  };

  const logoutUser = () => {
    logout();
  };

  return (
    <div className="custom-scrollbar sticky left-0 top-0 z-[950] flex h-screen flex-col overflow-y-auto bg-light-900 pb-4 max-lg:px-1 max-lg:shadow-sm max-md:hidden lg:w-[14rem] xl:w-[15rem]">
      <div className="mt-4 flex w-full justify-center">
        <Link href="/">
          <Image
            src="/images/icons/site-logo.svg"
            width={160}
            height={86}
            alt="site logo"
            className="max-lg:hidden"
          />
          <Image
            src="/images/icons/site-logo.svg"
            width={30}
            height={30}
            alt="site logo"
            className="lg:hidden"
          />
        </Link>
      </div>
      <div className="mt-12 flex w-full flex-col items-center gap-[1.315rem]">
        {navLinks[role!].map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (!item.isBottom) {
            return (
              <Link key={item.label} href={item.route} className="">
                <Button
                  className={`${isActive ? "bg-primary-500 text-light-900" : "text-[#808494]"} flex justify-start gap-[0.63rem] rounded-[5px] pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem] hover:bg-primary-400 hover:text-light-900 lg:w-[12.125rem] xl:w-[13.125rem]`}
                >
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt="icon"
                    className="invert"
                  />
                  <span className="max-lg:hidden">{item.label}</span>
                </Button>
              </Link>
            );
          } else return null;
        })}
      </div>
      <div className="mt-4 w-full border" />
      <div className="mt-12 flex flex-col items-center gap-[1.315rem]">
        {navLinks[role!].map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.isBottom) {
            return (
              <Link key={item.label} href={item.route} className="">
                <Button
                  className={`${isActive ? "bg-primary-500 text-light-900" : "text-[#808494]"} flex justify-start gap-[0.63rem] rounded-[5px] pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem] hover:bg-primary-400 hover:text-light-900 lg:w-[13.125rem]`}
                >
                  <Image
                    src={item.icon}
                    width={20}
                    height={20}
                    alt="menu grid"
                  />
                  <span className="max-lg:hidden">{item.label}</span>
                </Button>
              </Link>
            );
          } else return null;
        })}

        <Button
          onClick={logoutUser}
          className={`flex justify-start gap-[0.63rem] rounded-[5px] pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem] text-[#808494] hover:bg-primary-400 hover:text-light-900 lg:w-[13.125rem]`}
        >
          <Image
            src="/images/icons/logout.svg"
            width={20}
            height={20}
            alt="logout"
          />
          <span className="max-lg:hidden">Log Out</span>
        </Button>
      </div>
      <div className="mt-20 flex justify-center">
        <div className="flex items-center justify-center gap-[1.25rem] rounded-md py-2 lg:w-[13.125rem] lg:bg-[#808494]">
          <Image
            src="/images/icons/db-left-avatar.svg"
            width={40}
            height={40}
            alt="user avatar"
          />{" "}
          <span className="text-[0.75rem] font-medium max-lg:hidden">
            Bolt Corporation Ltd
          </span>
        </div>
      </div>
    </div>
  );
};

export default DBLeft;
