"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import {
  activateNotification,
  sendNotification,
} from "@/lib/actions/other.actions";
import { toast } from "sonner";
import LoaderOverlay from "../LoaderOverlay";

const Preferences = () => {
  const [isPending, startTransition] = useTransition();

  const handleActivateNotif = () => {
    startTransition(() => {
      activateNotification().then((data) => {
        if (data?.error) {
          toast(data.error);
        } else {
          toast.success(data.success);
        }
      });
    });
  };

  const handleSendNotif = () => {
    startTransition(() => {
      sendNotification().then((data) => {
        if (data?.error) {
          toast(data.error);
        } else {
          toast.success(data.success);
        }
      });
    });
  };
  return (
    <>
      <div className="mt-6 h-[30rem] w-full px-2 max-xs:px-1 md:mt-12 lg:px-5 xl:px-10">
        <h2 className="mb-8 font-[700] md:text-[1.125rem]">Preferences</h2>
        <h3 className="text-[3rem] font-semibold">
          Please ignore this page. Do not interact.
        </h3>
        <div className="flex gap-6">
          <Button onClick={handleActivateNotif}>Activate Notification</Button>
          <Button onClick={handleSendNotif}>Send Notification</Button>
        </div>
      </div>
      {isPending && (
        <LoaderOverlay type="cliploader" size={45} text="Please wait..." />
      )}
    </>
  );
};

export default Preferences;
