import { formatPrice, getSimpleDateTime } from "@/lib/utils";
import Image from "next/image";
import { Transaction } from "@prisma/client";

const SellerRecentTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="w-full rounded-md bg-light-900 px-2 py-4 md:px-3">
      <div className="flex flex-col gap-1">
        <span className="text-[0.875rem] font-medium">Recent transactions</span>
        <span className="text-[0.75rem] font-medium text-[#8798AD]">
          Showing your transactions in the past hour
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {transactions?.length > 0 ? (
          transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-6 rounded-md bg-[#F1F3F9] px-2 py-3 xs:px-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={
                    "flex size-[2rem] items-center justify-center rounded-full bg-primary-100"
                  }
                >
                  <Image
                    src="/images/icons/naira-in-green.svg"
                    width={20}
                    height={20}
                    alt="naira"
                    className=""
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[0.875rem] font-semibold capitalize">
                    {transaction.category}
                  </span>

                  <span className="text-[0.75rem] font-semibold text-[#8798AD]">
                    {getSimpleDateTime(transaction.date)}
                  </span>
                  <span className="text-[0.875rem] font-semibold text-[#8798AD]">
                    {transaction.orderNumber}
                  </span>
                </div>
              </div>
              <span className="text-[0.875rem] font-[700]">
                {formatPrice(Number(transaction.amount))}
              </span>
            </div>
          ))
        ) : (
          <div className="flex h-[15rem] items-center justify-center">
            <p>No Transaction</p>
          </div>
        )}
      </div>

      {/* <div className="mt-4">
        <Link href="#">
          <Button className="flex h-[2.2rem] w-full items-center justify-center rounded-md border border-primary-500 font-semibold text-primary-500 hover:border-primary-100 md:h-[3rem]">
            View all Transactions
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

export default SellerRecentTransactions;
