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

export function formatPriceNGN(amount: number): string {
  // Convert amount to string and split into integer and decimal parts
  const strAmount: string = amount.toFixed(2);
  const parts: string[] = strAmount.split(".");

  // Extract integer part and format with commas
  const integerPart: string = parts[0];
  const integerPartWithCommas: string =
    parseFloat(integerPart).toLocaleString("en");

  // Join integer and decimal parts with a period
  const formattedAmount: string = integerPartWithCommas + "." + parts[1];

  // Return the currency format with NGN prefix
  return "NGN " + formattedAmount;
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

export function currentTimestamp() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  return timestamp;
}

export function formatDate(date: string | Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create a Date object from either a date string or a Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Extract day, month, and year components
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  // Return formatted date string
  return `${day} ${month} ${year}`;
}
