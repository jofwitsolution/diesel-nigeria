import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  // Ensure price is a valid number
  if (isNaN(price)) {
    return "Invalid Price";
  }

  // Create a NumberFormat object for Nigerian Naira (NGN)
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the price using the NumberFormat object
  const formattedPrice = formatter.format(price);
  return formattedPrice;
}

export function getCurrentDate() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  // Function to get the ordinal suffix for the day of the month (e.g., 1st, 2nd, 3rd)
  function getOrdinalSuffix(number: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const formattedDate = `${dayOfWeek}, ${month} ${getOrdinalSuffix(dayOfMonth)}, ${year}`;
  return formattedDate;
}
