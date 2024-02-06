"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarLinks } from "@/constants";
import { useCurrentRole, useCurrentUser } from "@/hooks/user";
import { logout } from "@/lib/actions/auth.action";
import { getLoginRoute } from "@/lib/helpers/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-6 font-montserrat">
      {navbarLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <SheetClose asChild key={item.label}>
            <Link
              key={item.label}
              href={item.route}
              className={`${isActive && "font-[600] text-primary-500"} text-[0.9375rem] leading-[1.41rem]`}
            >
              {item.label}
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  const role = useCurrentRole();

  const logoutUser = () => {
    logout();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/images/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert md:hidden"
        />
      </SheetTrigger>
      <SheetContent side="left" className="z-[1000] bg-primary-50">
        <Link href="/" className="mt-[-0.5rem] flex items-center gap-1">
          <Image
            src="/images/icons/site-logo.svg"
            width={90}
            height={48}
            alt="Diesel NG"
          />
        </Link>

        <div className="pt-16">
          {useCurrentUser() && (
            <>
              <SheetClose asChild>
                <Link href={getLoginRoute(role as string)!} className="mb-6">
                  <Button className="flex justify-between gap-[0.63rem] rounded-[5px] bg-primary-500 pb-[0.5625rem] pl-[0.6875rem] pr-[4.6875rem] pt-[0.6875rem]">
                    <Image
                      src="/images/icons/menu-grid.svg"
                      width={20}
                      height={20}
                      alt="menu grid"
                    />
                    <span className="text-white">Dashboard</span>
                  </Button>
                </Link>
              </SheetClose>
            </>
          )}

          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className="mt-12 flex justify-center gap-6 font-inter text-[0.9375rem] leading-[1.41rem]">
            {!useCurrentUser() && (
              <>
                <SheetClose asChild>
                  <Link href="/auth/register" className="font-[600]">
                    Sign Up
                  </Link>
                </SheetClose>
                <SheetClose>
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1 px-2 font-[600]"
                  >
                    Log in
                    <Image
                      src="/images/icons/arrow-right.svg"
                      width={14}
                      height={13}
                      alt="arrow-right"
                    />
                  </Link>
                </SheetClose>
              </>
            )}
            {useCurrentUser() && (
              <SheetClose asChild>
                <Button
                  onClick={logoutUser}
                  className={`flex w-[13.125rem] justify-start gap-[0.63rem] rounded-[5px] pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem] text-[#808494]`}
                >
                  <Image
                    src="/images/icons/logout.svg"
                    width={20}
                    height={20}
                    alt="logout"
                  />
                  <span className="">Log Out</span>
                </Button>
              </SheetClose>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
