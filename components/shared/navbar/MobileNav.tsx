"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarLinks } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";
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
      <SheetContent side="left" className="bg-primary-50">
        <Link href="/" className="mt-[-1rem] flex items-center gap-1">
          <Image
            src="/images/icons/site-logo.svg"
            width={80}
            height={43}
            alt="Diesel NG"
          />
        </Link>

        <div className="pt-16">
          <SignedIn>
            <SheetClose asChild>
              <Link href="/" className="mb-6">
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
          </SignedIn>

          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className="mt-12 flex justify-center gap-6 font-inter text-[0.9375rem] leading-[1.41rem]">
            <SignedOut>
              <SheetClose asChild>
                <Link href="/sign-up" className="font-[600]">
                  Sign Up
                </Link>
              </SheetClose>
              <SheetClose>
                <Link
                  href="/sign-in"
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
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
