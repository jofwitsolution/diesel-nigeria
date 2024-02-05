import { db } from "../db";

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      password: true,
      document: true,
    },
  });

  console.log(user);
};
