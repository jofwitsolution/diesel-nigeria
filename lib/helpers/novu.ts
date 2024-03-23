import { Novu } from "@novu/node";
import { User } from "@prisma/client";

const novuApiKey = process.env.NOVU_API_KEY;

const novu = new Novu(novuApiKey!);

export async function createNovuSubscriber(user: User) {
  try {
    await novu.subscribers.identify(user.id, {
      email: user.email, // optional
      lastName: user.businessName!, // optional
      phone: user.phoneNumber!, // optional
      avatar: "", // optional
      data: { businessName: user.businessName!, rcNumber: user.rcNumber! }, // optional
    });

    return true;
  } catch (error) {
    if (error?.response) {
      console.log(error.response.data.message);
      console.log(error.response.data.statusCode);
    }
    return null;
  }
}

export async function updateNovuSubscriber(user: User) {
  try {
    await novu.subscribers.update(user.id, {
      email: user.email, // optional
      lastName: user.businessName!, // optional
      phone: user.phoneNumber!, // optional
      avatar: user?.avatar?.url ?? "", // optional
      data: { businessName: user.businessName!, rcNumber: user.rcNumber! }, // optional
    });

    return true;
  } catch (error) {
    if (error?.response) {
      console.log(error.response.data.message);
      console.log(error.response.data.statusCode);
    }
    return null;
  }
}

export async function triggerNotification(user: User) {
  try {
    const notificationWorkflowId = "dieselng-in-app";

    await novu.trigger(notificationWorkflowId, {
      to: {
        subscriberId: user.id,
      },
      payload: {
        lastName: user.businessName!,
      },
    });
  } catch (error) {
    if (error?.response) {
      console.log(error.response.data.message);
      console.log(error.response.data.statusCode);
    }
  }
}

export async function triggerNovu(
  subscriberId: string,
  workflowId: string,
  payload: {}
) {
  try {
    await novu.trigger(workflowId, {
      to: {
        subscriberId,
      },
      payload,
    });
  } catch (error) {
    if (error?.response) {
      console.log(error.response.data.message);
      console.log(error.response.data.statusCode);
    }
  }
}
