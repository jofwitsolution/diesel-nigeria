"use client";

import { useCurrentUser } from "@/hooks/user";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";

const applicationIdentifier =
  process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER;
function Novu() {
  const currentUser = useCurrentUser();

  return (
    <NovuProvider
      subscriberId={currentUser?.id}
      applicationIdentifier={applicationIdentifier!}
    >
      <PopoverNotificationCenter colorScheme="dark">
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}

export default Novu;
