"use client";

import React, { useState, useTransition } from "react";
import { User } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/shared/dialog/DialogWrapper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  approveSellerDocs,
  rejectBusinessDocs,
} from "@/lib/actions/admin.action";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import LoaderOverlay from "@/components/LoaderOverlay";

interface Props {
  seller: User;
}

const SellerProfile = ({ seller }: Props) => {
  const pathname = usePathname();
  const [isApproveDialogOpen, setApproveDialogOpen] = useState(false);
  const [isRejected, setRejected] = useState(false);

  const [isPending, startTransition] = useTransition();

  const approveDocument = () => {
    startTransition(() => {
      approveSellerDocs(seller.id, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setApproveDialogOpen(false);
          toast.success("Verification document approved");
        }
      });
    });
  };

  const handleRejectionSubmit = (e) => {
    e.preventDefault();

    const description = e.target.description.value;

    if (!description) {
      toast.error("Please enter reason for rejection");
    }

    startTransition(() => {
      rejectBusinessDocs(seller.id, description, pathname).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          setRejected(false);
          toast.success("Verification document rejected");
        }
      });
    });
  };

  return (
    <div>
      <div>
        <div className="mt-8">
          <span className="font-[700] md:text-[1.125rem]">
            Business Information
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-20 gap-y-5">
          <div className="space-y-5">
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Name</span>
              <span className="ml-4 inline-block bg-gray-200 px-2 py-1 text-[#838799]">
                {seller.businessName}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Email</span>
              <span className="ml-4 inline-block bg-gray-200 px-2 py-1 text-[#838799]">
                {seller.email}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Address</span>
              <span className="ml-4 inline-block bg-gray-200 px-2 py-1 text-[#838799]">
                {seller.address}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Phone Number</span>
              <span className="ml-4 inline-block bg-gray-200 px-2 py-1 text-[#838799]">
                {seller.phoneNumber}
              </span>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">RC Number</span>
              <span className="ml-4 inline-block bg-gray-200 px-2 py-1 text-[#838799]">
                {seller.rcNumber}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Email Verification</span>
              <span className="ml-4 inline-block bg-gray-200 px-2 py-1 text-[#838799]">
                {seller?.emailVerified
                  ? `Verified since ${formatDate(seller.emailVerified)}`
                  : "Not verified"}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Business Description</span>
              <p className="ml-4 inline-block max-w-[20rem] bg-gray-200 px-2 py-1 text-[#838799]">
                {seller.businessDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <span className="font-[700] md:text-[1.125rem]">
            Business Verification Document
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-20">
          <div className="space-y-5">
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Verification Status</span>

              {seller.isVerifiedSeller ? (
                <span className="ml-4 font-semibold uppercase text-primary-500">
                  Verified
                </span>
              ) : (
                <span className="ml-4 font-semibold uppercase text-red-500">
                  Not verified
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">
                Certificate of Incorporation
              </span>
              {seller?.incorporationCertificate?.url ? (
                <span className="ml-4 flex flex-col gap-2">
                  <span className="text-primary-400">
                    incorporation-certificate.pdf
                  </span>
                  <Link
                    href={seller?.incorporationCertificate?.url}
                    target="_blank"
                    rel="noreferer"
                    className="font-medium text-blue-500 underline"
                  >
                    Open document
                  </Link>
                </span>
              ) : (
                <span className="text-red-400">No document</span>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Form CAC 7</span>
              {seller?.CACForm?.url ? (
                <span className="ml-4 flex flex-col gap-2">
                  <span className="text-primary-400">CAC-form.pdf</span>
                  <Link
                    href={seller?.CACForm?.url}
                    target="_blank"
                    rel="noreferer"
                    className="font-medium text-blue-500 underline"
                  >
                    Open document
                  </Link>
                </span>
              ) : (
                <span className="text-red-400">No document</span>
              )}
            </div>
            {!seller.isVerifiedSeller && (
              <div className="flex flex-col gap-3">
                <span className="text-[0.875rem]">Decision</span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setApproveDialogOpen(true)}
                    className="h-[2.2rem] bg-primary-400 px-2 text-light-900 hover:bg-primary-500"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => setRejected(true)}
                    className="h-[2.2rem] bg-red-400 px-2 text-light-900 hover:bg-red-500"
                  >
                    Reject
                  </Button>
                </div>

                {isRejected && (
                  <form
                    onSubmit={handleRejectionSubmit}
                    className="ml-4 mt-5 flex w-full flex-col gap-2 md:w-[35rem]"
                  >
                    <Label htmlFor="description">
                      State reason for rejection
                    </Label>
                    <div className="w-full">
                      <Textarea
                        name="description"
                        id="description"
                        placeholder="Type here!"
                        className="h-[10rem] w-full"
                      />
                    </div>
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="h-[2.2rem] w-max bg-gray-400 px-2 text-light-900 hover:bg-gray-500"
                    >
                      Submit
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <DialogWrapper
        title="Verification Document"
        customClose
        handleDialogState={() => setApproveDialogOpen(!isApproveDialogOpen)}
        dialogState={isApproveDialogOpen}
        containerStyle="max-sm:w-[18.75rem] sm:max-w-[24.375rem]"
      >
        <div className="space-y-6">
          <div>
            <p>
              Are you sure the provided documents are valid and belong to the
              business owner?
            </p>
            <p className="mt-1">
              If yes, click confirm to proceed. Otherwise, close the dialog.
            </p>
          </div>
          <div>
            <Button
              disabled={isPending}
              onClick={approveDocument}
              className="h-[2.2rem] w-full bg-primary-400 px-2 text-light-900 hover:bg-primary-500"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogWrapper>
      {isPending && <LoaderOverlay type="cliploader" size={45} />}
    </div>
  );
};

export default SellerProfile;
