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
