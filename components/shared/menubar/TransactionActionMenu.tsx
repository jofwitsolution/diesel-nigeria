"use client";

import Image from "next/image";
import { Transaction } from "@prisma/client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
// import DialogWrapper from "../dialog/DialogWrapper";
// import { Button } from "@/components/ui/button";

const TransactionActionMenu = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
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
            <MenubarItem
              onClick={() => {}}
              className="flex cursor-pointer items-center gap-5"
            >
              <Image
                src="/images/icons/eye.svg"
                width={15}
                height={10}
                alt="delete"
                className=""
              />{" "}
              <span>View Details</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {/* <DialogWrapper
        title=""
        dialogState={isDialogOpen}
        customClose={false}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
        handleDialogState={() => {}}
      >
        
      </DialogWrapper> */}
    </div>
  );
};

export default TransactionActionMenu;
