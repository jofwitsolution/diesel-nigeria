import { getMonthAbbreviation } from "@/lib/utils";

const monthsData = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0,
};

export function getPaymentsChartData(
  payments: { date: Date; amount: string }[]
) {
  const result = [];

  payments.forEach((payment) => {
    const monthAbbreviation = getMonthAbbreviation(payment.date);
    monthsData[monthAbbreviation] =
      parseInt(payment.amount) + monthsData[monthAbbreviation];
  });

  for (const key in monthsData) {
    result.push(monthsData[key]);
  }

  return result;
}
