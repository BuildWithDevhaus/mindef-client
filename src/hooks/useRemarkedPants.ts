import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { PantsInputSchema, PantsSchema } from "../zod/pants";

const RemarkedPantsAtom = atom<PantsSchema[] | []>([]);
const selectedRemarkedPantsAtom = atom<PantsSchema | null>(null);

export const useRemarkedPants = () => {
  const [remarkedPants, setRemarkedPants] = useAtom(RemarkedPantsAtom);
  const [selectedRemarkedPants, setSelectedRemarkedPants] = useAtom(selectedRemarkedPantsAtom);

  const getRemarkedPants = async () => {
    try {
      const { data: pantsData }: { data: PantsSchema[] } = await api.get('/pants?status=remarked');
      setRemarkedPants(pantsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const findRemarkedPants = async (rfidNo: string) => {
    try {
      const { data: pantsData }: { data: PantsSchema } = await api.get(`/pants/${rfidNo}?status=remarked`);
      setSelectedRemarkedPants(pantsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createRemarkedPants = async (pantsData: PantsInputSchema) => {
    try {
      await api.post('/pants?status=remarked', pantsData);
      getRemarkedPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }  

  const updateRemarkedPants = async (rfidNo: string, pantsData: Partial<PantsSchema>) => {
    try {
      await api.put(`/pants/${rfidNo}?status=remarked`, pantsData);
      getRemarkedPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }
  

  const deleteRemarkedPants = async (rfidNo: string) => { 
    try {
      await api.delete(`/pants/${rfidNo}?status=remarked`);
      getRemarkedPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { remarkedPants, selectedRemarkedPants, getRemarkedPants, findRemarkedPants, deleteRemarkedPants, createRemarkedPants, updateRemarkedPants };
}