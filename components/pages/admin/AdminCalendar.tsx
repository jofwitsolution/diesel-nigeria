"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const AdminCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  return (
    <div className="h-full rounded-md bg-light-900 p-4">
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
          cell: { padding: "0px 26px" },
          head_cell: { padding: "0px 26px" },
          head: { display: "none" },
        }}
      />
    </div>
  );
};

export default AdminCalendar;
