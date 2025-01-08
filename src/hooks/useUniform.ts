import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";
import { ShirtSchema } from "../zod/shirt";
import { PantsSchema } from "../zod/pants";
import { DrawUniformInputSchema } from "../zod/drawUniform";
import { AutoMeasurementSchema } from "../zod/autoMeasurement";

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

  const createDrawUniform = async (drawUniformData: DrawUniformInputSchema) => {
    try {
      const access_token = localStorage.getItem('access_token');
      await api.post('/draw-uniforms', drawUniformData, { headers: { Authorization: `Bearer ${access_token}` } });
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const getLatestAutoMeasurementDetails = async () => {
    try {
      const { data }: { data: AutoMeasurementSchema } = await api.get('/uniforms/auto-measurement');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { uniform, findUniform, createDrawUniform, getLatestAutoMeasurementDetails };
};

