import { exclude } from "@/prisma/pristma.utils";
import { db } from "../db";

export const getUser = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        wallet: true,
        avatar: true,
        document: true,
        CACForm: true,
        incorporationCertificate: true,
      },
    });

    const userWithoutPassword = exclude(user, ["password"]);

    return { user: userWithoutPassword };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
