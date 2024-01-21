import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HomeHero = () => {
  return (
    <header className="max-width py-[2.1rem] md:py-[4.25rem]">
      <section className="relative h-[47rem] w-full">
        <div className="absolute z-[2] flex size-full items-center justify-center rounded-[3.5rem] bg-dark-gradient">
          <div className="flex flex-col items-center gap-[1.5rem] px-[1rem]">
            <h1 className="mx-auto max-w-[44.5rem] text-center font-fraunces text-[2rem] font-normal leading-[2.5rem] tracking-[-1px] text-light-900 md:text-[4.04rem] md:leading-[5rem]">
              Welcome to the Future of Diesel Procurement!
            </h1>
            <span className="text-center text-[1.125rem] text-light-900">
              Manage, Order, Sell and Track your Diesel like Never Before{" "}
            </span>

            <p className="mx-auto max-w-[44.9375rem] text-center text-[1.125rem] text-light-500">
              Experience the power of real-time purchases and track your
              deliveries seamlessly. It&apos;s not just a service; it&apos;s a
              revolution in efficiency.
            </p>

            <Link href="/contact">
              <Button className="flex w-[11.0625rem] items-center justify-center rounded-[62.4375rem] bg-primary-500 hover:bg-primary-400">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>

        <Image
          src="/images/home/hero.png"
          alt="hero bg"
          fill
          className="rounded-[3.5rem] object-cover"
        />
      </section>
    </header>
  );
};

export default HomeHero;
