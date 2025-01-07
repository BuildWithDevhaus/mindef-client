import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { MonthlyReportSchema } from "../zod/monthlyReports";

const monthlyReportsAtom = atom<MonthlyReportSchema[] | []>([]);

export const useMonthlyReports = () => {
  const [monthlyReports, setMonthlyReports] = useAtom(monthlyReportsAtom);

const getMonthlyReports = async (month?: string, year?: string) => {
  try {
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (year) params.append('year', year);

    const { data: monthlyReportsData }: { data: MonthlyReportSchema[] } = await api.get(`/reports/monthly?${params.toString()}`);

    setMonthlyReports(monthlyReportsData);
    return monthlyReportsData;
  } catch (error) {
    console.error(error);
  }
}

  return { monthlyReports, getMonthlyReports };
}
