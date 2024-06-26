"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { useCurrentRole, useCurrentUser } from "@/hooks/user";
import { getLoginRoute } from "@/lib/helpers/user";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <nav className="fixed inset-0 z-[500] flex h-[4.0625rem] w-full items-center  justify-between bg-primary-50 px-[1.2rem] text-dark-500 shadow">
      <Link href="/">
        <Image
          src="/images/icons/site-logo.svg"
          width={105}
          height={51.4}
          alt="logo"
        />
      </Link>

      <div className="hidden justify-center gap-[2.5rem] font-montserrat md:flex">
        {navbarLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.label}
              href={item.route}
              className={`${isActive && "font-[600] text-primary-500"} text-[0.9375rem] leading-[1.41rem]`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-[2.5rem] font-inter text-[0.9375rem] leading-[1.41rem]">
        {!useCurrentUser() && (
          <>
            <Link href="/auth/register" className="hidden font-[600] md:inline">
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className="hidden items-center gap-1 px-2 font-[600] md:flex"
            >
              Log in
              <Image
                src="/images/icons/arrow-right.svg"
                width={14}
                height={13}
                alt="arrow-right"
              />
            </Link>
          </>
        )}

        {useCurrentUser() && (
          <Link href={getLoginRoute(role as string)!} className="max-md:hidden">
            <Button className="flex justify-between gap-[0.63rem] rounded-[5px] bg-primary-500 pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem]">
              <span className="text-white">Dashboard</span>
            </Button>
          </Link>
        )}

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
