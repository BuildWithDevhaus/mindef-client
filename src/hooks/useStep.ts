import { atom, useAtom } from "jotai";

const stepAtom = atom('scan-nric');

export const useStep = () => {
  const [step, setStep] = useAtom(stepAtom);

  return {
    step,
    setStep
  };
}