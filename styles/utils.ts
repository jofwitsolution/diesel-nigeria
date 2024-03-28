export const statusBg = (status: string) => {
  if (status === "delivered") return "bg-[rgba(0,255,0,0.07)] text-primary-500";
  if (status === "success") return "bg-[rgba(0,255,0,0.07)] text-primary-500";
  if (status === "successful")
    return "bg-[rgba(0,255,0,0.07)] text-primary-500";
  if (status === "progress") return "bg-yellow-100 text-yellow-500";
  if (status === "failed") return "bg-red-100 text-red-500";
  if (status === "reversed") return "bg-red-100 text-red-400";
  if (status === "pending") return "bg-yellow-100 text-yellow-500";
};
