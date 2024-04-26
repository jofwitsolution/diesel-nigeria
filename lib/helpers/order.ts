import { db } from "../db";

export async function generateOrderNumber() {
  try {
    // Query the database for the last order
    const lastOrder = await db.order.findFirst({
      orderBy: { orderNumber: "desc" },
    });

    if (lastOrder && lastOrder.orderNumber) {
      const lastOrderNumber = parseInt(lastOrder.orderNumber);
      return String(lastOrderNumber + 1).padStart(6, "0");
    } else {
      return "000001";
    }
  } catch (error) {
    console.error("Error generating order number:", error);
    throw error;
  }
}

export function countUniqueSellers(orders: Object[]) {
  const uniqueSellers = new Set();
  orders.forEach((order) => {
    uniqueSellers.add(order.seller.id);
  });
  return uniqueSellers.size;
}

export function countUniqueBuyers(orders: Object[]) {
  const uniqueBuyers = new Set();
  orders.forEach((order) => {
    uniqueBuyers.add(order.buyer.id);
  });
  return uniqueBuyers.size;
}

export function calculateOrderCost(productPrice: number, quantity: number) {
  const deliveryChargePerLitre = 10; // 10 Naira per litre

  const totalRate = Number(productPrice) * Number(quantity); // price per litre * number of litres
  const deliveryCharge = deliveryChargePerLitre * Number(quantity);

  const serviceCharge = (totalRate + deliveryCharge) * (1 / 100); // 1% of total rate and delivery charge

  const sellerSettlement = totalRate - totalRate * (0.5 / 100); // total rate minus 0.5% of the total rate

  const amount = totalRate + serviceCharge + deliveryCharge;

  return { amount, totalRate, deliveryCharge, serviceCharge, sellerSettlement };
}
