import { atom, useAtom } from "jotai";
import { staffSchema, StaffSchema } from "../zod/staff";

const staffAtom = atom<StaffSchema | null>(null);
const isLoggedInAtom = atom<Boolean>(false);
const isCheckingStaffAtom = atom<Boolean>(true);
const nricNoAtom = atom<string>("");

export const useStaff = () => {
  const [staff, setStaff] = useAtom(staffAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isCheckingStaff, setIsCheckingStaff] = useAtom(isCheckingStaffAtom);
  const [nricNo, setNricNo] = useAtom(nricNoAtom);

  // TODO: Remove newStaff parameter after implementation
  const staffLogin = (nricNo: string, newStaff: boolean) => {
    // TODO: Change this into real logic
    if (newStaff) {
      setStaff(null);
      setIsLoggedIn(false);
      setNricNo(nricNo);
    } else {
      setStaff({ nricNo: nricNo, name: "John Doe", division: "Sales", gender: "Male", shoulderLen: 16, sleeve: 16, collarLen: 16, waist: 16, length: 16 });
      setIsLoggedIn(true);
    }

    setIsCheckingStaff(false);
  };

  const staffLogout = () => {
    setStaff(null);
    setIsLoggedIn(false);
  };

  const staffRegister = (staffData: StaffSchema) => {
    // TODO: Change this into real logic
    console.log(staffData);
  };

  const staffUpdate = (staffData: Partial<StaffSchema>) => {
    // TODO: Change this into real logic
    const updatedStaff = staffSchema.parse({ ...staff, ...staffData });
    console.log(updatedStaff);
    setStaff(updatedStaff);
  };

  return { staff, isLoggedIn, isCheckingStaff, nricNo, staffLogin, staffLogout, staffRegister, staffUpdate };
};