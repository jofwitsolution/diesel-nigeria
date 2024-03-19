"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { WithdrawalRequest } from "@prisma/client";
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
import { toast } from "sonner";
import LoaderOverlay from "@/components/LoaderOverlay";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import Notice from "../Notice";
import {
  confirmFundTransfer,
  rejectWithdrawal,
} from "@/lib/actions/admin.action";

const AdminWithdrawalActionMenu = ({
  withdrawalRequest,
}: {
  withdrawalRequest: WithdrawalRequest;
}) => {
  const pathname = usePathname();

  const [isTransferDialogOpen, setTransferDialogOpen] = useState(false);
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleTransferAction = async () => {
    startTransition(() => {
      confirmFundTransfer(withdrawalRequest.id, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setTransferDialogOpen(false);
          toast.success("Withdrawal request confirmed");
        }
      });
    });
  };

  const handleRejectAction = async () => {
    startTransition(() => {
      rejectWithdrawal(withdrawalRequest.id, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setRejectDialogOpen(false);
          toast.success("Withdrawal request rejected!");
        }
      });
    });
  };

  return (
    <div className="">
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger
            disabled={withdrawalRequest.status !== "pending"}
            className=""
          >
            <Image
              src="/images/icons/menu-dot.svg"
              width={24}
              height={24}
              alt="menu"
              className="cursor-pointer"
            />
          </MenubarTrigger>
          <MenubarContent className="bg-light-900">
            <MenubarItem
              onClick={() => setTransferDialogOpen(true)}
              className="cursor-pointer hover:font-medium hover:text-primary-400"
            >
              Transfer fund
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              onClick={() => setRejectDialogOpen(true)}
              className="cursor-pointer hover:font-medium hover:text-primary-400"
            >
              Reject
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <DialogWrapper
        title="Fund Transfer"
        dialogState={isTransferDialogOpen}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
        handleDialogState={() => {
          setTransferDialogOpen(!isTransferDialogOpen);
        }}
      >
        <div className="space-y-4">
          <div>
            <p>
              Send{" "}
              <span className="font-semibold">
                {formatPrice(Number(withdrawalRequest.amount))}
              </span>{" "}
              to the below Seller account details
            </p>
            <br />
            <p>
              Account Name:{" "}
              <span className="font-medium">
                {withdrawalRequest?.user?.accountName}
              </span>
            </p>
            <p>
              Bank:{" "}
              <span className="font-medium">{withdrawalRequest.bank}</span>
            </p>
            <p>
              Account Number:{" "}
              <span className="font-medium">
                {withdrawalRequest.accountNumber}
              </span>
            </p>
          </div>
          <div className="mx-auto mb-6 max-w-[16rem]">
            <Notice content="Only click confirm if you have made a successful transfer to the provided account." />
          </div>
          <div className="flex justify-center gap-5">
            <Button
              disabled={isPending}
              onClick={handleTransferAction}
              className="rounded bg-primary-500 px-3 py-2 font-medium text-light-900 hover:bg-primary-400"
            >
              Confirm
            </Button>
            <Button
              disabled={isPending}
              onClick={() => setTransferDialogOpen(false)}
              className="rounded bg-red-500 px-3 py-2 font-medium text-light-900 hover:bg-red-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogWrapper>
      <DialogWrapper
        title="Reject Withdrawal"
        dialogState={isRejectDialogOpen}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
        handleDialogState={() => {
          setRejectDialogOpen(!isRejectDialogOpen);
        }}
      >
        <div className="space-y-4">
          <div>
            <p>
              Reject the withdrawal request of
              <span className="font-semibold">
                {formatPrice(Number(withdrawalRequest.amount))}
              </span>
              .
            </p>
            <br />
          </div>
          <div className="mx-auto mb-6 max-w-[16rem]">
            <Notice content="After rejecting, you won't be able to mark this request as successful. Confirm to proceed, cancel to go back." />
          </div>
          <div className="flex justify-center gap-5">
            <Button
              disabled={isPending}
              onClick={handleRejectAction}
              className="rounded bg-primary-500 px-3 py-2 font-medium text-light-900 hover:bg-primary-400"
            >
              Confirm
            </Button>
            <Button
              disabled={isPending}
              onClick={() => setRejectDialogOpen(false)}
              className="rounded bg-red-500 px-3 py-2 font-medium text-light-900 hover:bg-red-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogWrapper>
      {isPending && (
        <LoaderOverlay type="cliploader" size={40} text="Please wait..." />
      )}
    </div>
  );
};

export default AdminWithdrawalActionMenu;
