import { atom, useAtom } from "jotai";
import { ShirtInputSchema, ShirtSchema } from "../zod/shirt";
import { api } from "../helpers/api";

const remarkedShirtAtom = atom<ShirtSchema[] | []>([]);
const selectedRemarkedShirtAtom = atom<ShirtSchema | null>(null);

export const useRemarkedShirt = () => {
  const [remarkedShirts, setRemarkedShirts] = useAtom(remarkedShirtAtom);
  const [selectedRemarkedShirt, setSelectedRemarkedShirt] = useAtom(selectedRemarkedShirtAtom);

  const getRemarkedShirts = async () => {
    try {
      const { data: shirtsData }: { data: ShirtSchema[] } = await api.get('/shirts?status=remarked');
      setRemarkedShirts(shirtsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const findRemarkedShirt = async (rfidNo: string) => {
    try {
      const { data: shirtData }: { data: ShirtSchema } = await api.get(`/shirts/${rfidNo}?status=remarked`);
      setSelectedRemarkedShirt(shirtData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createRemarkedShirt = async (shirtData: ShirtInputSchema) => {
    try {
      await api.post('/shirts', shirtData);
      getRemarkedShirts();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const updateRemarkedShirt = async (rfidNo: string, shirtData: Partial<ShirtSchema>) => {
    try {
      await api.put(`/shirts/${rfidNo}?status=remarked`, shirtData);
      getRemarkedShirts();
    } catch (error) {
      console.error(error);
    }
  }

  const deleteRemarkedShirt = async (rfidNo: string) => {
    try {
      await api.delete(`/shirts/${rfidNo}?status=remarked`);
      getRemarkedShirts();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { remarkedShirts, selectedRemarkedShirt, getRemarkedShirts, findRemarkedShirt, deleteRemarkedShirt, createRemarkedShirt, updateRemarkedShirt };
}