import { atom, useAtom } from "jotai";
import { ShirtDimensionsSchema, ShirtInputSchema, ShirtSchema } from "../zod/shirt";
import { api } from "../helpers/api";

const shirtAtom = atom<ShirtSchema[] | []>([]);
const selectedShirtAtom = atom<ShirtSchema | null>(null);
const shirtDimensionsAtom = atom<ShirtDimensionsSchema | null>(null);

export const useShirt = () => {
  const [shirts, setShirts] = useAtom(shirtAtom);
  const [selectedShirt, setSelectedShirt] = useAtom(selectedShirtAtom);
  const [shirtDimensions, setShirtDimensions] = useAtom(shirtDimensionsAtom);

  const getShirts = async (uniformType?: string, gender?: string, collarLen?: string, sleeve? :string, shoulderLen?: string) => {
    try {
      const params = new URLSearchParams();

      if (uniformType) params.append('uniformType', uniformType);
      if (gender) params.append('gender', gender);
      if (collarLen) params.append('collarLen', collarLen);
      if (sleeve) params.append('sleeve', sleeve);
      if (shoulderLen) params.append('shoulderLen', shoulderLen);

      const { data: shirtsData }: { data: ShirtSchema[] } = await api.get(`/shirts?${params.toString()}`);

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

  const getShirtsDimensionRange = async () => {
    try {
      const { data: shirtDimensions }: { data: ShirtDimensionsSchema } = await api.get(`/shirts/dimension`);
      setShirtDimensions(shirtDimensions);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  getShirtsDimensionRange();

  return { shirts, selectedShirt, shirtDimensions, getShirts, findShirt, deleteShirt, createShirt, updateShirt, getShirtsDimensionRange };
}