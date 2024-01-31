import { db } from "@/lib/db";
import { loginRoutes } from "@/routes";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getLoginRoute = (role: string): string | undefined => {
  return loginRoutes[role];
};
