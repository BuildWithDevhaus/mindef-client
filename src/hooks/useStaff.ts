import { atom, useAtom } from "jotai";
import { StaffInputSchema, staffSchema, StaffSchema } from "../zod/staff";
import { api } from "../helpers/api";

const staffAtom = atom<StaffSchema | null>(null);
const isLoggedInAtom = atom<Boolean>(false);
const isCheckingStaffAtom = atom<Boolean>(true);
const nricNoAtom = atom<string>("");

export const useStaff = () => {
  const [staff, setStaff] = useAtom(staffAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isCheckingStaff, setIsCheckingStaff] = useAtom(isCheckingStaffAtom);
  const [nricNo, setNricNo] = useAtom(nricNoAtom);

  const staffLogin = async (nricNo: string) => {
    try {
      const { data: { access_token } } = await api.post('/staffs/login', { nricNo });
      localStorage.setItem('access_token', access_token);
      const { data: staff }: { data: StaffSchema } = await api.get(`/staffs/${nricNo}`);
      
      setStaff(staff);
      setIsLoggedIn(true);
    } catch (error) {
      setStaff(null);
      setIsLoggedIn(false);
    } finally {
      setNricNo(nricNo);
      setIsCheckingStaff(false);
    }
  };

  const staffLogout = () => {
    localStorage.removeItem('access_token');
    setStaff(null);
    setIsLoggedIn(false);
  };

  const staffRegister = async (staffData: StaffInputSchema) => {
    try {
      await api.post('/staffs', staffData);
    } catch (error) {
      console.error(error);
    }
  };

  const staffUpdate = (staffData: Partial<StaffSchema>) => {
    // TODO: Change this into real logic
    const updatedStaff = staffSchema.parse({ ...staff, ...staffData });
    setStaff(updatedStaff);
  };

  return { staff, isLoggedIn, isCheckingStaff, nricNo, staffLogin, staffLogout, staffRegister, staffUpdate };
};