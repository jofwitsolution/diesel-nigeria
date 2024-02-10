import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const ExportAs = () => {
  return (
    <Button className="flex gap-3 bg-light-900 px-6 font-[600] max-xs:px-3">
      <span>Export as</span>
      <Image src="/images/icons/down.svg" width={15} height={7.5} alt="down" />
    </Button>
  );
};

export default ExportAs;
