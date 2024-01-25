import Image from "next/image";
import React from "react";

const Businesses = () => {
  return (
    <section className="max-width py-[3rem] md:py-[6rem]">
      <div className="relative mx-auto h-[16rem] md:h-[21.8rem] md:max-w-[70rem]">
        <Image
          src="/images/home/businesses.png"
          alt="businesses"
          fill
          className="object-center md:object-cover"
        />
      </div>
    </section>
  );
};

export default Businesses;
