import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Contributions = () => {
  return (
    <section className="bg-[#004540] py-[3rem] sm:h-[80rem] lg:h-[45rem] lg:py-0">
      <div className="max-width flex flex-col items-center gap-6 lg:h-full lg:flex-row">
        <div className="ml-[2rem] flex-[1]">
          <h3 className="mb-4 font-medium text-[#FFDE59] sm:mb-6">
            Contributions
          </h3>
          <h4 className="mb-[1.2rem] font-fraunces text-[2rem] leading-[2.5rem] text-light-900 sm:mb-[1.8rem] md:text-[3.796rem] md:leading-[4.5rem]">
            Indurstries We Serve
          </h4>
          <p className="mb-[1.8rem] max-w-[29.125rem] text-light-900 md:leading-[1.57rem]">
            Whether you&apos;re a corporate organization, hotel, school,
            factory, event organizer, church, or home, our commitment is
            unwavering. We redefine the diesel procurement experience to elevate
            your operations to new heights.
          </p>

          <Link href="/about">
            <Button className="flex w-[9.5625rem] items-center justify-center rounded-[62.4375rem] bg-[#FFDE59] font-fraunces text-[#002112] hover:bg-[#fade6d]">
              Learn more
            </Button>
          </Link>
        </div>

        {/* Display sm screen upward */}
        <div className="relative mx-auto mt-[2rem] hidden w-[35rem] sm:block lg:mt-[0] lg:h-full lg:w-[initial] lg:flex-[1]">
          {/* beginning of card */}
          <div className="absolute top-0 flex w-[12.8838rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="relative h-[8.5rem]">
              <Image
                src="/images/home/img-1.png"
                fill
                alt="img-1"
                className="rounded-t-[0.7rem] object-center"
              />
            </div>
            <div className="flex flex-col items-center px-[6px] pb-[3.56rem]">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Education Sector
              </h5>
              <p className="text-center text-[0.6875rem] leading-[1.1rem] text-[#002112]">
                Education is a vital sector, and DieselNg.com understands the
                importance of consistent and reliable fuel sources for schools
                and universities.
              </p>
            </div>
          </div>
          {/* end of card */}

          {/* beginning of card */}
          <div className="absolute left-[47%] top-0 flex w-[12.8838rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="relative h-[11rem]">
              <Image
                src="/images/home/img-2.png"
                fill
                alt="img-2"
                className="rounded-t-[0.7rem] object-cover"
              />
            </div>
            <div className="flex flex-col items-center px-[6px] pb-[0.56rem]">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Corporate Offices
              </h5>
              <p className="text-center text-[0.6875rem] leading-[1.1rem] text-[#002112]">
                DieselNg.com caters to the diesel needs of corporate offices.
                From large enterprises to growing firms, our platform ensures
                that you have access to real-time diesel prices and trusted
                suppliers, streamlining your operations for maximum efficiency.
              </p>
            </div>
          </div>
          {/* end of card */}

          {/* beginning of card */}
          <div className="absolute left-[5%] top-[22rem] flex w-[12.8838rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="flex flex-col items-center px-[6px] pt-[0.6rem]">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Factories
              </h5>
              <p className="text-center text-[0.6875rem] leading-[1.1rem] text-[#002112]">
                Factories and industrial units, efficiency is paramount.
                DieselNg.com streamlines diesel transactions, connecting you
                with trusted suppliers, reducing the need for excessive storage,
                and keeping your production processes running smoothly
              </p>
            </div>
            <div className="relative h-[8.5rem]">
              <Image
                src="/images/home/img-3.png"
                fill
                alt="img-2"
                className="rounded-b-[0.7rem] object-cover"
              />
            </div>
          </div>
          {/* end of card */}

          {/* beginning of card */}
          <div className="absolute left-[52%] top-[25rem] flex w-[12.8838rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="flex flex-col items-center px-[6px] pt-[0.6rem]">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Events
              </h5>
              <p className="text-center text-[0.6875rem] leading-[1.1rem] text-[#002112]">
                For event organizers orchestrating parties, church gatherings,
                weddings, or even solemn farewells, DieselNg.com adds a touch of
                ease to the festivities, helping you plan your next event
                without the stress of diesel procurement.
              </p>
            </div>
            <div className="relative h-[8rem]">
              <Image
                src="/images/home/img-4.png"
                fill
                alt="img-2"
                className="rounded-b-[0.7rem] object-cover"
              />
            </div>
          </div>
          {/* end of card */}
        </div>

        {/* Display sm screen downward */}
        <div className="mt-6 flex flex-col gap-6 sm:hidden">
          {/* beginning of card */}
          <div className="flex w-[17rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="relative h-[9.5rem]">
              <Image
                src="/images/home/img-1.png"
                fill
                alt="img-1"
                className="rounded-t-[0.7rem] object-center"
              />
            </div>
            <div className="flex flex-col items-center px-2 pb-3">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Education Sector
              </h5>
              <p className="text-center text-[0.8rem] text-[#002112]">
                Education is a vital sector, and DieselNg.com understands the
                importance of consistent and reliable fuel sources for schools
                and universities.
              </p>
            </div>
          </div>
          {/* end of card */}

          {/* beginning of card */}
          <div className="flex w-[17rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="relative h-[9.5rem]">
              <Image
                src="/images/home/img-2.png"
                fill
                alt="img-2"
                className="rounded-t-[0.7rem] object-cover"
              />
            </div>
            <div className="flex flex-col items-center px-2 pb-2">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Corporate Offices
              </h5>
              <p className="text-center text-[0.8rem] text-[#002112]">
                DieselNg.com caters to the diesel needs of corporate offices.
                From large enterprises to growing firms, our platform ensures
                that you have access to real-time diesel prices and trusted
                suppliers, streamlining your operations for maximum efficiency.
              </p>
            </div>
          </div>
          {/* end of card */}

          {/* beginning of card */}
          <div className="flex w-[17rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="relative h-[9.5rem]">
              <Image
                src="/images/home/img-3.png"
                fill
                alt="img-2"
                className="rounded-t-[0.7rem] object-cover"
              />
            </div>
            <div className="flex flex-col items-center px-2 pb-2">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Factories
              </h5>
              <p className="text-center text-[0.8rem] text-[#002112]">
                Factories and industrial units, efficiency is paramount.
                DieselNg.com streamlines diesel transactions, connecting you
                with trusted suppliers, reducing the need for excessive storage,
                and keeping your production processes running smoothly
              </p>
            </div>
          </div>
          {/* end of card */}

          {/* beginning of card */}
          <div className="flex w-[17rem] flex-col justify-start gap-[0.845rem] rounded-[0.7rem] bg-light-900">
            <div className="relative h-[9.5rem]">
              <Image
                src="/images/home/img-4.png"
                fill
                alt="img-2"
                className="rounded-t-[0.7rem] object-cover"
              />
            </div>
            <div className="flex flex-col items-center px-2 pb-2">
              <h5 className="text-[1.1rem] font-medium text-[#121212] md:text-[1.2rem]">
                Events
              </h5>
              <p className="text-center text-[0.8rem] text-[#002112]">
                For event organizers orchestrating parties, church gatherings,
                weddings, or even solemn farewells, DieselNg.com adds a touch of
                ease to the festivities, helping you plan your next event
                without the stress of diesel procurement.
              </p>
            </div>
          </div>
          {/* end of card */}
        </div>
      </div>
    </section>
  );
};

export default Contributions;
