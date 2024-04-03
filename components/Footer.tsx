import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-width">
        <div className="relative mx-auto h-[52rem] max-w-[70rem] md:h-[45rem] lg:h-[43.5625rem]">
          <div className="absolute z-[2] size-full bg-dark-gradient pt-[3.5rem] md:pt-[8.5rem]">
            <div className="flex w-full flex-col gap-y-14 md:flex-row md:justify-between">
              <div className="flex flex-col items-center gap-[2rem] text-light-900 md:gap-[2.5rem]">
                <p className="max-w-[23.9375rem] text-center font-fraunces md:text-[1.3rem] lg:text-[1.5rem]">
                  We are revolutionizing the diesel retail industry, ensuring
                  ease and integrity in transactions, and efficiency in
                  operations.
                </p>
                <Link href="mailto: +2349031105298" className="">
                  +234-903-110-5298
                </Link>
              </div>
              <div className="flex gap-12 max-xs:text-[0.85rem]">
                <div className="text-light-900">
                  <span className="mb-5 inline-block font-[600] md:text-[1.12rem]">
                    Features
                  </span>
                  <ul className="list-none">
                    <li className="mb-3 md:mb-5">
                      <Link href="#" className="hover:text-primary-500">
                        Enterprise
                      </Link>
                    </li>
                    <li className="mb-3 md:mb-5">
                      <Link href="#" className="hover:text-primary-500">
                        Customer Service
                      </Link>
                    </li>
                    <li className="mb-3 md:mb-5">
                      <Link href="#" className="hover:text-primary-500">
                        Media & Entertainment
                      </Link>
                    </li>
                    <li className="mb-3 md:mb-5">
                      <Link href="#" className="hover:text-primary-500">
                        Product
                      </Link>
                    </li>
                    <li className="mb-3 md:mb-5">
                      <Link href="#" className="hover:text-primary-500">
                        Analytics
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="text-light-900">
                  <span className="mb-5 inline-block font-[600] md:text-[1.12rem]">
                    Company
                  </span>
                  <ul className="list-none">
                    <li className="mb-3 md:mb-5">
                      <Link href="/" className="hover:text-primary-500">
                        Home
                      </Link>
                    </li>
                    <li className="mb-3 md:mb-5">
                      <Link href="/about" className="hover:text-primary-500">
                        About Us
                      </Link>
                    </li>
                    <li className="mb-3 md:mb-5">
                      <Link href="/contact" className="hover:text-primary-500">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 md:mt-2 md:gap-7">
              <h6 className="text-center text-[0.88rem] font-medium text-light-500">
                Connect with us
              </h6>
              <div className="flex gap-8">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/images/icons/facebook.svg"
                    width={26}
                    height={26}
                    alt="facebook"
                  />
                </Link>
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/images/icons/instagram.svg"
                    width={26}
                    height={26}
                    alt="facebook"
                  />
                </Link>
                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/images/icons/youtube.svg"
                    width={26}
                    height={26}
                    alt="facebook"
                  />
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-[2rem] flex max-w-[58.75rem] flex-col gap-[1rem] md:mt-[4rem] md:flex-row md:items-center">
              <div>
                <span className="text-[0.88rem] text-light-500">
                  Subscribe to our E-newsletter
                </span>
              </div>
              <div className="flex h-[1.8rem] w-full gap-2 sm:h-[2.5rem] sm:w-[70%] sm:gap-[1rem]">
                <Input
                  type="email"
                  placeholder="E-mail"
                  className="h-full w-[80%] rounded-none border-none bg-[#2B2B2B] text-light-900"
                />
                <Button className="h-full w-[20%] rounded-none bg-primary-500 font-fraunces text-[0.6rem] hover:bg-primary-400 sm:text-[0.85rem]">
                  Subcribe
                </Button>
              </div>
            </div>

            <div className="mt-12 flex flex-col-reverse items-center gap-y-10 text-light-500 md:mt-16 md:flex-row md:justify-between">
              <div className="">2024© DieselNg. All rights reserved.</div>
              <div className="text-[0.86rem]">
                <Link href="#">DIESELNG</Link> |
                <Link href="/terms"> Terms & Conditions with Disclaimer</Link> |
                <Link href="/privacy"> Privacy Policy</Link> |
                <Link href="#"> Recruitment</Link>
              </div>
            </div>
          </div>
          <Image
            src="/images/home/site-logo.png"
            fill
            alt="logo"
            className="object-center"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
