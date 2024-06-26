"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { adminNavLinks, buyerNavLinks, sellerNavLinks } from "@/constants";
import { useCurrentRole } from "@/hooks/user";
import { logout } from "@/lib/actions/auth.action";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
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
    <section className="flex flex-col gap-6 font-montserrat">
      {navLinks[role!].map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.label}>
            <Link key={item.label} href={item.route} className="">
              <Button
                className={`${isActive ? "bg-primary-500 text-light-900" : "text-[#808494]"} flex w-[10rem] justify-start gap-[0.63rem] rounded-[5px] pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem] hover:bg-primary-400 hover:text-light-900 xs:w-[13.125rem]`}
              >
                <Image
                  src={item.icon}
                  width={20}
                  height={20}
                  alt="icon"
                  className="invert"
                />
                <span className="">{item.label}</span>
              </Button>
            </Link>
          </SheetClose>
        );
      })}

      <SheetClose asChild>
        <Button
          onClick={logoutUser}
          className={`flex w-[13.125rem] justify-start gap-[0.63rem] rounded-[5px] pb-[0.5625rem] pl-[0.6875rem] pt-[0.6875rem] text-[#808494] hover:bg-primary-400 hover:text-light-900`}
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
    </section>
  );
};

interface Props {
  user: User;
}

const DBMobileNav = ({ user }: Props) => {
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
      <SheetContent
        side="left"
        className="z-[1000] overflow-y-auto bg-primary-50"
      >
        <Link href="/" className="mt-[-0.5rem] flex items-center gap-1">
          <Image
            src="/images/icons/site-logo.svg"
            width={90}
            height={48}
            alt="Diesel NG"
          />
        </Link>

        <div className="pt-16">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className="mt-20">
            <div className="flex w-[10rem] items-center gap-[1.25rem] rounded-md bg-[#808494] p-2 max-xs:px-1 xs:w-[13.125rem]">
              <Image
                src={
                  user?.avatar
                    ? (user?.avatar?.url as string)
                    : "/images/icons/db-left-avatar.svg"
                }
                width={40}
                height={40}
                alt="user avatar"
              />{" "}
              <span className="text-[0.75rem] font-medium">
                {user?.businessName}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DBMobileNav;
