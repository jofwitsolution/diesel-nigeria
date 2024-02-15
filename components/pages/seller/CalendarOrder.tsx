"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { formatDate, getTimeOfDay } from "@/lib/utils";

const CalendarOrder = () => {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

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
          fromYear={2024}
          fixedWeeks
          required
          toDate={new Date()}
          selected={date}
          onDayClick={(day) => {
            setDate(day);
            console.log(day);
          }}
          modifiersClassNames={{
            selected: "text-light-900 bg-primary-500",
          }}
          className="rounded-md font-[600] shadow-md"
          styles={{
            day: {
              height: "20px",
              width: "20px",
              borderRadius: "0px",
            },
            row: { height: "25px" },
            // root: { width: "300px" },
            // cell: { padding: "0px 26px" },
            // head_cell: { padding: "0px 26px" },
            head: { display: "none" },
          }}
        />
      </div>
      <div className="mt-8 flex justify-between px-6">
        <span>Order list for: </span>
        <span className="font-semibold">{formatDate(date)}</span>
      </div>
      <div className="mt-8 space-y-6 px-2">
        {/* order one */}
        <div>
          <span className="text-[0.75rem] font-medium">
            Payment Order #2345
          </span>
          <div className="mt-3 flex flex-col gap-2 text-[0.75rem] font-medium text-[#808494]">
            <span className="font-medium">Mrs Oil Company</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/clock.svg"
                width={20}
                height={20}
                alt="clock"
              />
              <span>
                {getTimeOfDay("2024-02-15T10:30:00")} -{" "}
                {getTimeOfDay("2024-02-15T12:30:00")}
              </span>
            </div>
          </div>
        </div>
        {/* order one */}
        <div>
          <span className="text-[0.75rem] font-medium">
            Payment Order #2345
          </span>
          <div className="mt-3 flex flex-col gap-2 text-[0.75rem] font-medium text-[#808494]">
            <span className="font-medium">Mrs Oil Company</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/clock.svg"
                width={20}
                height={20}
                alt="clock"
              />
              <span>
                {getTimeOfDay("2024-02-15T10:30:00")} -{" "}
                {getTimeOfDay("2024-02-15T12:30:00")}
              </span>
            </div>
          </div>
        </div>
        {/* order one */}
        <div>
          <span className="text-[0.75rem] font-medium">
            Payment Order #2345
          </span>
          <div className="mt-3 flex flex-col gap-2 text-[0.75rem] font-medium text-[#808494]">
            <span className="font-medium">Mrs Oil Company</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/icons/clock.svg"
                width={20}
                height={20}
                alt="clock"
              />
              <span>
                {getTimeOfDay("2024-02-15T10:30:00")} -{" "}
                {getTimeOfDay("2024-02-15T12:30:00")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarOrder;
