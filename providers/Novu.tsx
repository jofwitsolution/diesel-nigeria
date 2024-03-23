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
      stores={[
        { storeId: "default_store" },
        {
          storeId: "Read",
          query: { seen: true },
        },
        {
          storeId: "Unread",
          query: { seen: false },
        },
      ]}
    >
      <PopoverNotificationCenter
        tabs={[
          // name can be any custom name
          { name: "All", storeId: "default_store" },
          { name: "Read", storeId: "Read" },
          { name: "Unread", storeId: "Unread" },
        ]}
        showUserPreferences={false}
        colorScheme="light"
      >
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
}

export default Novu;

// function CustomNotificationCenter() {
//   const { socket } = useSocket();

//   useEffect(() => {
//     if (socket) {
//       socket.on("notification_received", (data) => {
//         console.log(data);
//         toast.success("Welcome message");
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off("notification_received");
//       }
//     };
//   }, [socket]);

//   return <></>;
// }

// function Novu() {
//   const currentUser = useCurrentUser();

//   return (
//     <NovuProvider
//       subscriberId={currentUser?.id}
//       applicationIdentifier={applicationIdentifier!}
//     >
//       <CustomNotificationCenter />
//     </NovuProvider>
//   );
// }

// export default Novu;
