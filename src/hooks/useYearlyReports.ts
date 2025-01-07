import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { YearlyReportSchema } from "../zod/yearlyReports";

const yearlyReportsAtom = atom<YearlyReportSchema[] | []>([]);

export const useYearlyReports = () => {
  const [yearlyReports, setyearlyReports] = useAtom(yearlyReportsAtom);

  const getYearlyReports = async ( year?:string ) => {
    try {
      const params = new URLSearchParams();
      if (year) params.append('year', year)

      const { data: yearlyReportsData }: { data: YearlyReportSchema[] } = await api.get(`/reports/yearly?${params.toString()}`);
      
      setyearlyReports(yearlyReportsData);
      return yearlyReportsData;
    } catch (error) {
      console.error(error);
    }
  }

  return { yearlyReports, getYearlyReports };
}