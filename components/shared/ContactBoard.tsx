import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactBoard = () => {
  return (
    <section className="bg-black">
      <div className="max-width py-[3rem] md:py-[4.2rem]">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="contactboard-card">
            <Image
              src="/images/icons/learn.svg"
              width={38.2}
              height={41.2}
              alt="learn"
            />

            <h6 className="font-fraunces text-[1.125rem] leading-[1.5rem] text-light-900">
              Want to learn more about DieselNg?
            </h6>

            <p className="font-medium leading-[1.5rem] text-[rgba(255,255,255,0.60)]">
              We are just a click away from all the answers you may need
            </p>

            <Link
              href="/contact"
              className="font-fraunces leading-[1.08rem] text-light-900 underline"
            >
              Get in touch
            </Link>
          </div>

          <div className="contactboard-card">
            <Image
              src="/images/icons/onboard.svg"
              width={38.2}
              height={41.2}
              alt="onboard"
            />

            <h6 className="font-fraunces text-[1.125rem] leading-[1.5rem] text-light-900">
              Onboard with us
            </h6>

            <p className="font-medium leading-[1.5rem] text-[rgba(255,255,255,0.60)]">
              Join other buyers and sellers of diesel and experience diesel
              transaction redefined
            </p>

            <Link
              href="/contact"
              className="font-fraunces leading-[1.08rem] text-light-900 underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBoard;
