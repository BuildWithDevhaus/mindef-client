import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { YearlyReportSchema } from "../zod/yearlyReports";

const yearlyReportsAtom = atom<YearlyReportSchema[] | []>([]);

export const useYearlyReports = () => {
  const [yearlyReports, setyearlyReports] = useAtom(yearlyReportsAtom);

  const getYearlyReports = async () => {
    try {
      const { data: yearlyReportsData }: { data: YearlyReportSchema[] } = await api.get('/reports/yearly');
      setyearlyReports(yearlyReportsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { yearlyReports, getYearlyReports };
}