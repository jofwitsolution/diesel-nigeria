"use server";

import { db } from "../db";
import { getCurrentUser } from "../helpers/auth";
import { createNovuSubscriber, triggerNotification } from "../helpers/novu";

export const activateNotification = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await db.user.findUnique({ where: { id: currentUser.id } });
    if (!user) {
      return { error: "No user!" };
    }

    const isSuccessCreate = await createNovuSubscriber(user);
    if (!isSuccessCreate) {
      return { error: "Problem activating notification!" };
    }

    return { success: "Done" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const sendNotification = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { error: "Unauthenticated" };
    }

    const user = await db.user.findUnique({ where: { id: currentUser.id } });
    if (!user) {
      return { error: "No user!" };
    }

    await triggerNotification(user);

    return { success: "Done" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};
