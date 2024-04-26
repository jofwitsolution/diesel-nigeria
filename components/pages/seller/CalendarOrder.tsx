"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { formatDate, getTimeOfDay } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/user";
import { Order } from "@prisma/client";

const CalendarOrder = () => {
  const currentUser = useCurrentUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const endPoint = `/api/v1/orders?userId=${currentUser?.id}&take=4&orderBy=asc&selectedDate=${date}`;
        const res = await fetch(endPoint, {
          next: { revalidate: 60 },
        });
        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [date, currentUser]);

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
        {orders.map((order) => (
          <div key={order.id}>
            <span className="text-[0.75rem] font-medium">
              Payment Order {order.orderNumber}
            </span>
            <div className="mt-3 flex flex-col gap-2 text-[0.75rem] font-medium text-[#808494]">
              <span className="font-medium">{order.buyer.businessName}</span>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/clock.svg"
                  width={20}
                  height={20}
                  alt="clock"
                />
                <span>{getTimeOfDay(order.orderDate)}</span>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="flex h-[5rem] items-center justify-center">
            {loading ? <p>Loading...</p> : <p>No order</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarOrder;
