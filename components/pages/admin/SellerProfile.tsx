"use client";

import React from "react";
import { User } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Props {
  seller: User;
}

const SellerProfile = ({ seller }: Props) => {
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
              <span className="ml-4 text-[#838799]">{seller.businessName}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Email</span>
              <span className="ml-4 text-[#838799]">{seller.email}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Address</span>
              <span className="ml-4 text-[#838799]">{seller.address}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Busniess Phone Number</span>
              <span className="ml-4 text-[#838799]">{seller.phoneNumber}</span>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">RC Number</span>
              <span className="ml-4 text-[#838799]">{seller.rcNumber}</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Email Verification</span>
              <span className="ml-4 text-[#838799]">
                {seller?.emailVerified
                  ? `Verified since ${formatDate(seller.emailVerified)}`
                  : "Not verified"}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[0.875rem]">Business Description</span>
              <p className="ml-4 max-w-[20rem] text-[#838799]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
