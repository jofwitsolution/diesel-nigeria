import { PrismaClient } from "@prisma/client";
import { sellers, users } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  for (const sellerData of sellers) {
    const seller = await prisma.user.create({
      data: sellerData,
    });

    await prisma.wallet.create({
      data: {
        userId: seller.id,
      },
    });
  }

  await prisma.user.createMany({ data: users });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
