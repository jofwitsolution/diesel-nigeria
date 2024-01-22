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
