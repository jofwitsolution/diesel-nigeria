import Image from "next/image";
import React from "react";

interface Props {
  content: string;
}

const Notice = ({ content }: Props) => {
  return (
    <div className="flex w-full gap-3 rounded-md border-2 border-red-500 bg-red-50 px-2 py-4 md:px-4">
      <Image
        src="/images/icons/angle-exclamation.svg"
        width={20}
        height={20}
        alt="exclamation"
      />
      <p className="text-[0.75rem] text-red-500">{content}</p>
    </div>
  );
};

export default Notice;
