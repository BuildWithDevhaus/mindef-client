import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { PantsDimensionsSchema, PantsInputSchema, PantsSchema } from "../zod/pants";

const pantsAtom = atom<PantsSchema[] | []>([]);
const selectedPantsAtom = atom<PantsSchema | null>(null);
const pantsDimensionsAtom = atom<PantsDimensionsSchema | null>(null);

export const usePants = () => {
  const [pants, setPants] = useAtom(pantsAtom);
  const [filteredPants, setFilteredPants] = useAtom(pantsAtom);
  const [selectedPants, setSelectedPants] = useAtom(selectedPantsAtom);
  const [pantsDimensions, setPantsDimensions] = useAtom(pantsDimensionsAtom);

  const getPants = async () => {
    try {
      const { data: pantsData }: { data: PantsSchema[] } = await api.get('/pants');
      setPants(pantsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const getPantsByFilter = async (uniformType: string, gender: string, waist: string, length: string) => {
    try {
      const params = new URLSearchParams({
        uniformType,
        gender,
        waist,
        length,
        status: 'available',
      });

      const { data: pantsData }: { data: PantsSchema[] } = await api.get(`/pants?${params.toString()}`);

      setFilteredPants(pantsData);
      return pantsData;
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

  const createPants = async (pantsData: PantsInputSchema) => {
    try {
      await api.post('/pants', pantsData);
      getPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }  

  const updatePants = async (rfidNo: string, pantsData: Partial<PantsSchema>) => {
    try {
      await api.put(`/pants/${rfidNo}`, pantsData);
      getPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const deletePants = async (rfidNo: string) => { 
    try {
      await api.delete(`/pants/${rfidNo}`);
      getPants();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const getPantsDimensionRange = async (uniformType?: string, gender?: string) => {
    try {
      const params = new URLSearchParams();

      if (uniformType) params.append('uniformType', uniformType);
      if (gender) params.append('gender', gender);

      const { data: pantsDimensions }: { data: PantsDimensionsSchema } = await api.get(`/pants/dimension?${params.toString()}`);
      setPantsDimensions(pantsDimensions);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createBulkPants = async (pantsData: PantsInputSchema[]) => {
    try {
      const { data } = await api.post('/pants/bulk', pantsData);
      getPants();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { pants, selectedPants, pantsDimensions, filteredPants, getPants, findPants, deletePants, createPants, updatePants, getPantsDimensionRange, getPantsByFilter, createBulkPants };
}