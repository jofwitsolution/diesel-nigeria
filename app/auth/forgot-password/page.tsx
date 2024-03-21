import React from "react";
import ForgotPassword from "@/components/forms/ForgotPassword";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="m-8 md:m-12">
        <Link href="/">
          {" "}
          <Image
            src="/images/icons/site-logo.svg"
            width={101}
            height={52}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <ForgotPassword />
      </div>
    </div>
  );
};

export default Page;
