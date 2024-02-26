export const statusBg = (status: string) => {
  if (status === "delivered") return "bg-primary-100 text-primary-500";
  if (status === "success") return "bg-primary-100 text-primary-500";
  if (status === "progress") return "bg-yellow-200 text-yellow-500";
  if (status === "failed") return "bg-red-200 text-red-500";
  if (status === "pending") return "bg-yellow-200 text-yellow-500";
};
