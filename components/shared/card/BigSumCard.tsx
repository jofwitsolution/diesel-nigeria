import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  icon: string;
}

const BigSumCard = ({ children, title, icon }: Props) => {
  return (
    <Card className="h-[11.8125rem] w-full bg-light-900 xs:w-[13.1875rem]">
      <CardHeader className="flex flex-col items-center">
        <span>
          <Image src={icon} width={40} height={40} alt={title} />
        </span>
        <CardTitle className="text-[0.75rem] font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-[-1rem] flex flex-col items-center">
        {children}
      </CardContent>
    </Card>
  );
};

export default BigSumCard;
