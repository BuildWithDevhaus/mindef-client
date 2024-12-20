import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { ReasonInputSchema, ReasonSchema } from "../zod/reason";

const reasonAtom = atom<ReasonSchema[] | []>([]);
const selectedReasonAtom = atom<ReasonSchema | null>(null);

export const useReason = () => {
  const [reasons, setReasons] = useAtom(reasonAtom);
  const [selectedReason, setSelectedReason] = useAtom(selectedReasonAtom);

  const getReasons = async () => {
    try {
      const { data: reasonsData }: { data: ReasonSchema[] } = await api.get('/delete-reasons');
      setReasons(reasonsData);
      return;
    } catch (error) {
      console.error(error);
    }
  }


  const findReason = async (id: string) => {
    try {
      const { data: reasonData }: { data: ReasonSchema } = await api.get(`/delete-reasons/${id}`);
      setSelectedReason(reasonData);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const createReason = async (reasonData: ReasonInputSchema) => {
    try {
      await api.post('/delete-reasons', reasonData);
      getReasons();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  const updateReason = async (id: string, reasonData: Partial<ReasonSchema>) => {
    try {
      await api.put(`/delete-reasons/${id}`, reasonData);
      getReasons();
    } catch (error) {
      console.error(error);
    }
  }

  const deleteReason = async (id: string) => {
    try {
      await api.delete(`/delete-reasons/${id}`);
      getReasons();
      return;
    } catch (error) {
      console.error(error);
    }
  }

  return { reasons, selectedReason, getReasons, findReason, deleteReason, createReason, updateReason };
}