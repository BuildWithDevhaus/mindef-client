import { atom, useAtom } from "jotai";
import { api } from "../helpers/api";

const serialDataAtom = atom<any>(null);

export const userSerialPort = () => {
  const [serialData, setSerialData] = useAtom(serialDataAtom);

  const getSerialData = async () => {
    try {
      const { data: serialData }: { data: any } = await api.get('/serial-data');
      setSerialData(serialData);
      return serialData;
    } catch (error) {
      console.error(error);
    }
  }

  return { serialData, getSerialData };
}