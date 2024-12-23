import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { ShirtSchema } from "../zod/shirt";
import { PantsSchema } from "../zod/pants";

type UniformSchema = { type: 'shirt', data: ShirtSchema } | { type: 'pants', data: PantsSchema };

const uniformAtom = atom<UniformSchema | null>(null);

export const useUniform = () => {
  const [uniform, setUniform] = useAtom(uniformAtom);

  const findUniform = async (rfidNo: string) => {
    try {
      const { data }: { data: ShirtSchema | PantsSchema } = await api.get(`/uniforms/${rfidNo}`);
      if ('collarLen' in data) {
        setUniform({ type: 'shirt', data });
      } else {
        setUniform({ type: 'pants', data });
      }
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { uniform, findUniform };
};

