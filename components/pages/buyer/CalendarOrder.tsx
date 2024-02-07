"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

const CalendarOrder = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="rounded-md bg-light-900 p-4">
      <div className="mb-4 flex items-center gap-5">
        <Image
          src="/images/icons/reservation-orders.svg"
          width={16}
          height={16}
          alt="orders"
        />
        <span className="font-semibold">All Orders</span>
      </div>
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={() => console.log(date)}
          className="rounded-md border font-[600]"
        />
      </div>
    </div>
  );
};

export default CalendarOrder;
