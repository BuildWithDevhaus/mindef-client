import { atom, useAtom } from "jotai";
import { ShirtInputSchema, ShirtSchema } from "../zod/shirt";
import { api } from "../helpers/api";

const shirtAtom = atom<ShirtSchema[] | []>([]);
const selectedShirtAtom = atom<ShirtSchema | null>(null);

export const useShirt = () => {
  const [shirts, setShirts] = useAtom(shirtAtom);
  const [selectedShirt, setSelectedShirt] = useAtom(selectedShirtAtom);

  const getShirts = async () => {
    try {
      const { data: shirtsData }: { data: ShirtSchema[] } = await api.get('/shirts');
      setShirts(shirtsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const findShirt = async (rfidNo: string) => {
    try {
      const { data: shirtData }: { data: ShirtSchema } = await api.get(`/shirts/${rfidNo}`);
      setSelectedShirt(shirtData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createShirt = async (shirtData: ShirtInputSchema) => {
    try {
      await api.post('/shirts', shirtData);
      getShirts();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const updateShirt = async (rfidNo: string, shirtData: Partial<ShirtSchema>) => {
    try {
      await api.put(`/shirts/${rfidNo}`, shirtData);
      getShirts();
    } catch (error) {
      console.error(error);
    }
  }

  const deleteShirt = async (rfidNo: string) => {
    try {
      await api.delete(`/shirts/${rfidNo}`);
      getShirts();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { shirts, selectedShirt, getShirts, findShirt, deleteShirt, createShirt, updateShirt };
}