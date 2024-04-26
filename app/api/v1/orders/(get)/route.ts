import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/helpers/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const take = searchParams.get("take");
    const orderBy = searchParams.get("orderBy");
    const selectedDate = searchParams.get("selectedDate");

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return Response.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const query = {
      where: { OR: [{ buyerId: userId }, { sellerId: userId }] },
      orderBy: {
        orderDate: orderBy,
      },
      include: {
        seller: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
        buyer: {
          select: {
            avatar: true,
            businessName: true,
            rcNumber: true,
            id: true,
            address: true,
          },
        },
        product: true,
      },
    };

    if (take !== null) {
      query.take = parseInt(take);
    }

    if (selectedDate !== null) {
      // Calculate the start date
      const startDate = new Date(selectedDate);

      // calculate the next date
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 1
      );
      query.where.orderDate = { gte: startDate, lt: endDate };
    }

    const orders = await db.order.findMany(query);

    return Response.json({ orders });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
