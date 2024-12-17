import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { PantsSchema } from "../zod/pants";

const pantsAtom = atom<PantsSchema[] | []>([]);
const selectedPantsAtom = atom<PantsSchema | null>(null);

export const usePants = () => {
  const [pants, setPants] = useAtom(pantsAtom);
  const [selectedPants, setSelectedPants] = useAtom(selectedPantsAtom);

  const getPants = async () => {
    try {
      const { data: pantsData }: { data: PantsSchema[] } = await api.get('/pants');
      setPants(pantsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const findPants = async (rfidNo: string) => {
    try {
      const { data: pantsData }: { data: PantsSchema } = await api.get(`/pants/${rfidNo}`);
      setSelectedPants(pantsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  // const createPants = (pantsData: PantsSchema) => {
  //   // TODO: Change this into real logic
  //   return;
  // }  

  // const updatePants = (id: number, pantsData: Partial<PantsSchema>) => {
  //   // TODO: Change this into real logic
  //   return;

  // }

  const deletePants = async (rfidNo: string) => { 
    try {
      await api.delete(`/pants/${rfidNo}`);
      getPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { pants, selectedPants, getPants, findPants, deletePants };
}