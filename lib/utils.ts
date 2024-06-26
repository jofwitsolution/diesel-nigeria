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
  // Ensure amount is a valid number
  if (isNaN(amount)) {
    return "Invalid Price";
  }

  // Convert amount to string and split into integer and decimal parts
  const strAmount: string = Number(amount).toFixed(2);
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

export function generatePassword(length: number): string {
  // Check if the length is at least 12, if not, set it to 12
  length = Math.max(length, 12);

  // Define character sets
  const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars: string = "!@#$%^&*()-_+=<>?";

  // Initialize password string
  let password: string = "";

  // Function to get a random character from a given set
  function getRandomChar(charSet: string): string {
    const randomIndex: number = Math.floor(Math.random() * charSet.length);
    return charSet.charAt(randomIndex);
  }

  // Ensure at least one uppercase, lowercase, and special character
  password += getRandomChar(lowercaseChars);
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(specialChars);

  // Generate remaining characters
  const remainingLength: number = length - 3; // Subtracting 3 because we already added 3 characters
  for (let i: number = 0; i < remainingLength; i++) {
    const randomSetIndex: number = Math.floor(Math.random() * 3); // Randomly choose a character set
    if (randomSetIndex === 0) {
      password += getRandomChar(lowercaseChars);
    } else if (randomSetIndex === 1) {
      password += getRandomChar(uppercaseChars);
    } else {
      password += getRandomChar(specialChars);
    }
  }

  // Shuffle the password to randomize the order
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

export function getTimeOfDay(input: string | Date | number): string {
  let date: Date;

  if (typeof input === "string") {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else if (typeof input === "number") {
    date = new Date(input);
  } else {
    throw new Error(
      "Invalid input type. Please provide a string, Date object, or timestamp."
    );
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}${ampm}`;
}

export function getSimpleDateTime(input: string | Date | number): string {
  let date: Date;

  // Convert input to Date object
  if (typeof input === "string") {
    date = new Date(input);
  } else if (typeof input === "number") {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    throw new Error(
      "Invalid input. Please provide a valid date string, date object, or timestamp."
    );
  }

  // Get month name
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
  const monthName = months[date.getMonth()];

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format and determine AM/PM
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  // Format the date and time
  const formattedDateTime = `${monthName} ${date.getDate()}, ${hours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;

  return formattedDateTime;
}

export function getMonthAbbreviation(
  input: string | Date | number | Date
): string {
  let date: Date;

  // Convert input to Date object
  if (typeof input === "string") {
    date = new Date(input);
  } else if (typeof input === "number") {
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    throw new Error(
      "Invalid input. Please provide a valid date string, date object, or timestamp."
    );
  }

  // Get month abbreviation
  const monthsAbbreviation = [
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

  return monthsAbbreviation[date.getMonth()];
}

export function getJanuary1stOfCurrentYear(): Date {
  const today = new Date();
  const currentYear = today.getFullYear();
  const januaryFirst = new Date(currentYear, 0, 1); // Note: Months are 0-based in JavaScript Date constructor
  return januaryFirst;
}

export function generateRandomCode(numDigits: number): string {
  if (numDigits <= 0) {
    throw new Error("Number of digits must be greater than zero");
  }

  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;

  // Generate a random number within the specified range
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomCode.toString();
}

export function getStartOfToday() {
  const currentDate = new Date();
  // Calculate the start date of today
  const startOfToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return startOfToday;
}
