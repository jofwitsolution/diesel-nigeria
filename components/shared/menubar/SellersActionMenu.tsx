"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import DialogWrapper from "../dialog/DialogWrapper";
import { Button } from "@/components/ui/button";
import { adminDeleteUser, adminSuspendUser } from "@/lib/actions/admin.action";
import { toast } from "sonner";
import LoaderOverlay from "@/components/LoaderOverlay";
import { usePathname } from "next/navigation";

const actionDetails = {
  suspend: {
    action: "suspend",
    title: "Suspend Account",
    bodyText:
      "Are you sure you want to suspend this account? This Seller will be unable to make any transaction if you suspend the account",
    actionBtnText: "Yes, suspend",
  },
  activate: {
    action: "activate",
    title: "Activate Account",
    bodyText:
      "Are you sure you want to activate this account? This Seller will be able to make any transaction if you activate the account",
    actionBtnText: "Yes, activate",
  },
  delete: {
    action: "delete",
    title: "Delete Account",
    bodyText:
      "Are you sure you want to delete this account? This Seller will be removed from DieselNg. Note: Verify the seller doesn't have an active order before deleting.",
    actionBtnText: "Yes, delete",
  },
};

const SellersActionMenu = ({ seller }: { seller: User }) => {
  const pathname = usePathname();

  const [selectedAction, setAction] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleItemClicked = (action: keyof Object) => {
    setAction(actionDetails[action]);
    setIsDialogOpen(true);
  };

  const handleAction = async () => {
    if (selectedAction.action === "delete") {
      startTransition(() => {
        adminDeleteUser(seller.id, pathname).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }

          if (data?.success) {
            setIsDialogOpen(false);
            toast.success(data.success);
          }
        });
      });
    } else {
      startTransition(() => {
        adminSuspendUser(seller.id, selectedAction.action, pathname).then(
          (data) => {
            if (data?.error) {
              toast.error(data.error);
            }

            if (data?.success) {
              setAction({});
              setIsDialogOpen(false);
              toast.success(data.success);
            }
          }
        );
      });
    }
  };

  return (
    <div className="">
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="">
            <Image
              src="/images/icons/menu-dot.svg"
              width={24}
              height={24}
              alt="menu"
              className="cursor-pointer"
            />
          </MenubarTrigger>
          <MenubarContent className="bg-light-900">
            {seller.isSuspended ? (
              <MenubarItem
                onClick={() => handleItemClicked("activate" as keyof Object)}
                className="flex cursor-pointer items-center gap-5"
              >
                <Image
                  src="/images/icons/exclamation-warning.svg"
                  width={21}
                  height={19}
                  alt="warning"
                  className="cursor-pointer"
                />{" "}
                <span>Activate</span>
              </MenubarItem>
            ) : (
              <MenubarItem
                onClick={() => handleItemClicked("suspend" as keyof Object)}
                className="flex cursor-pointer items-center gap-5"
              >
                <Image
                  src="/images/icons/exclamation-warning.svg"
                  width={21}
                  height={19}
                  alt="warning"
                  className="cursor-pointer"
                />{" "}
                <span>Suspend</span>
              </MenubarItem>
            )}
            <MenubarSeparator />
            <MenubarItem
              onClick={() => handleItemClicked("delete" as keyof Object)}
              className="flex cursor-pointer items-center gap-5"
            >
              <Image
                src="/images/icons/delete.svg"
                width={21}
                height={19}
                alt="delete"
                className=""
              />{" "}
              <span>Delete</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <DialogWrapper
        title=""
        dialogState={isDialogOpen}
        customClose={false}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
        handleDialogState={() => {}}
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <Image
            src="/images/icons/exclamation-warning.svg"
            width={24}
            height={23}
            alt="warning"
            className=""
          />
          <h3 className="text-center font-fraunces md:text-[1.5rem]">
            {selectedAction?.title}
          </h3>

          <p className="text-center">{selectedAction?.bodyText}</p>

          <div className="flex justify-center gap-5">
            <Button
              disabled={isPending}
              onClick={handleAction}
              className="rounded bg-primary-500 px-3 py-2 font-medium text-light-900 hover:bg-primary-400"
            >
              {selectedAction?.actionBtnText}
            </Button>
            <Button
              disabled={isPending}
              onClick={() => setIsDialogOpen(false)}
              className="rounded bg-red-500 px-3 py-2 font-medium text-light-900 hover:bg-red-400"
            >
              No, cancel
            </Button>
          </div>
        </div>
      </DialogWrapper>
      {isPending && <LoaderOverlay type="cliploader" size={40} />}
    </div>
  );
};

export default SellersActionMenu;
