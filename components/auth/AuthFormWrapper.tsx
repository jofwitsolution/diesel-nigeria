import Image from "next/image";
import Link from "next/link";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  backButton: boolean;
  backButtonHref?: string;
  headerText?: string;
  footerText: string;
  footerHrefLabel: string;
  footerHref: string;
}

const AuthFormWrapper = ({
  children,
  backButton,
  backButtonHref,
  headerText,
  footerText,
  footerHrefLabel,
  footerHref,
}: WrapperProps) => {
  return (
    <div className="flex h-[64rem] w-full">
      <div className="relative h-full flex-[1] bg-white">
        <div className="absolute left-[2rem] top-[2rem] space-y-[2.5rem]">
          <Link href="/">
            {" "}
            <Image
              src="/images/icons/site-logo.svg"
              width={101}
              height={52}
              alt="logo"
            />
          </Link>
          {backButton && (
            <Link href={backButtonHref!} className="flex items-center gap-2">
              <Image
                src="/images/icons/back.svg"
                width={24}
                height={24}
                alt="back"
              />
              <span className="text-[0.9rem] font-medium text-primary-500">
                Back
              </span>
            </Link>
          )}
        </div>
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] px-[1rem]">
          <h1 className="mb-[1.3rem] font-fraunces text-[1.5rem] text-[#151515] md:text-[1.9rem]">
            {headerText}
          </h1>
          <div className="">{children}</div>
          <div className="mt-[5rem] flex w-full justify-center space-x-2">
            <span>{footerText}</span>
            <Link
              href={footerHref}
              className="font-fraunces text-primary-500 hover:underline"
            >
              {footerHrefLabel}
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full flex-[1] bg-primary-50 lg:block">
        <Image
          src="/images/home/diesel-logo.png"
          fill
          alt="diesel-logo"
          className="object-contain"
        />
        <Image
          src="/images/home/fuel-pump.png"
          fill
          alt="fuel-pump"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthFormWrapper;
