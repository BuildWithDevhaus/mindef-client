import { atom, useAtom } from "jotai";
import { DivisionInputSchema, DivisionSchema } from "../zod/division";
import { api } from "../helpers/api";

const divisionAtom = atom<DivisionSchema[] | []>([]);
const selectedDivisionAtom = atom<DivisionSchema | null>(null);

export const useDivision = () => {
  const [divisions, setDivisions] = useAtom(divisionAtom);
  const [selectedDivision, setSelectedDivision] = useAtom(selectedDivisionAtom);

  const getDivisions = async () => {
    try {
      const { data: divisionsData }: { data: DivisionSchema[] } = await api.get('/divisions');
      setDivisions(divisionsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }


  const findDivision = async (id: string) => {
    try {
      const { data: divisionData }: { data: DivisionSchema } = await api.get(`/divisions/${id}`);
      setSelectedDivision(divisionData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createDivision = async (divisionData: DivisionInputSchema) => {
    try {
      await api.post('/divisions', divisionData);
      getDivisions();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const updateDivision = async (id: string, divisionData: Partial<DivisionSchema>) => {
    try {
      await api.put(`/divisions/${id}`, divisionData);
      getDivisions();
    } catch (error) {
      console.error(error);
    }
  }

  const deleteDivision = async (id: string) => {
    try {
      await api.delete(`/divisions/${id}`);
      getDivisions();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { divisions, selectedDivision, getDivisions, findDivision, deleteDivision, createDivision, updateDivision };
}