import { atom, useAtom } from "jotai";
import { UnitWingInputSchema, UnitWingSchema } from "../zod/unitWing";
import { api } from "../helpers/api";

const unitWingAtom = atom<UnitWingSchema[] | []>([]);
const selectedUnitWingAtom = atom<UnitWingSchema | null>(null);

export const useUnitWing = () => {
  const [unitWings, setUnitWings] = useAtom(unitWingAtom);
  const [selectedUnitWing, setSelectedUnitWing] = useAtom(selectedUnitWingAtom);

  const getUnitWings = async () => {
    try {
      const { data: unitWingData }: { data: UnitWingSchema[] } = await api.get('/divisions');
      setUnitWings(unitWingData);
      return;
    } catch (error) {
      console.error(error);
    }
  }


  const findUnitWing = async (id: string) => {
    try {
      const { data: unitWingData }: { data: UnitWingSchema } = await api.get(`/divisions/${id}`);
      setSelectedUnitWing(unitWingData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createUnitWing = async (unitWingData: UnitWingInputSchema) => {
    try {
      await api.post('/divisions', unitWingData);
      getUnitWings();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const updateUnitWing = async (id: string, unitWingData: Partial<UnitWingSchema>) => {
    try {
      await api.put(`/divisions/${id}`, unitWingData);
      getUnitWings();
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUnitWing = async (id: string) => {
    try {
      await api.delete(`/divisions/${id}`);
      getUnitWings();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { unitWings, selectedUnitWing, getUnitWings, findUnitWing, deleteUnitWing, createUnitWing, updateUnitWing };
}