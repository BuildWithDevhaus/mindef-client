import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { MonthlyReportSchema } from "../zod/monthlyReports";

const monthlyReportsAtom = atom<MonthlyReportSchema[] | []>([]);

export const useMonthlyReports = () => {
  const [monthlyReports, setMonthlyReports] = useAtom(monthlyReportsAtom);

  const getMonthlyReports = async () => {
    try {
      const { data: monthlyReportsData }: { data: MonthlyReportSchema[] } = await api.get('/reports/monthly');
      setMonthlyReports(monthlyReportsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { monthlyReports, getMonthlyReports };
}